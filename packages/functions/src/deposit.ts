import * as functions from 'firebase-functions'
import { app as getApp } from 'firebase-admin'
import { web3, contract, account } from './web3'
import { firestore } from 'firebase-admin/lib/firestore'

const app = getApp()
const db = app.firestore()

contract.events.EthClaimed((err: any, data: any) => {
  console.log(err, data)
})

export const setDeposit = functions.https.onCall(async (deposit, context) => {
  if (!context.auth?.token?.admin) {
    throw new functions.https.HttpsError('unauthenticated', '')
  }

  const tokenCount = await contract.methods.totalSupply().call().then(parseInt)
  const amountPerToken = deposit / tokenCount
  const tokenIds = await contract
    .getPastEvents('Transfer', {
      filter: {
        from: '0x0000000000000000000000000000000000000000',
      },
      fromBlock: 0,
    })
    .then((transfers) => transfers.map((tr: any) => tr.returnValues.tokenId))

  const batch = db.batch()
  const promises = tokenIds.map((tokenId) => {
    return new Promise(async (resolve) => {
      const { docs, empty } = await db
        .collection('deposits')
        .where('tokenId', '==', tokenId)
        .get()

      if (empty) {
        const doc = db.collection('deposits').doc()
        batch.set(doc, { tokenId, value: amountPerToken })
      } else {
        const [doc] = docs
        batch.update(doc.ref, {
          value: firestore.FieldValue.increment(amountPerToken),
        })
      }

      resolve(true)
    })
  })

  return Promise.all(promises).then(() => batch.commit())
})

export const getDataForClaim = functions.https.onCall(async (_, context) => {
  if (!context.auth?.uid) {
    throw new functions.https.HttpsError('unauthenticated', '')
  }

  const tokensOfOwner = await contract.methods
    .tokensOfOwner(context.auth.uid)
    .call()
  const depositsSnapshot = await db
    .collection('deposits')
    .where('tokenId', 'in', tokensOfOwner)
    .where('value', '>', 0)
    .get()

  if (depositsSnapshot.empty) {
    throw new functions.https.HttpsError('unavailable', '')
  }

  let amount: string | number = 0

  depositsSnapshot.forEach((doc) => {
    const { value } = doc.data()
    amount += value
  })

  amount = web3.utils.toWei(amount.toString())

  const claimRef = await db.collection('claims').add({
    address: context.auth.uid,
    deposits: depositsSnapshot.docs.map((d) => d.ref),
  })

  const { signature } = account.sign(
    web3.utils.keccak256(web3.utils.encodePacked(amount, claimRef.id)!)
  )

  return {
    amount,
    signature,
    nonce: claimRef.id,
  }
})
