import * as functions from 'firebase-functions'
import { app as getApp, firestore } from 'firebase-admin'
import { web3, voodollzContract, cwContract, account } from './web3'
import { estimateGas } from './utils'
import dayjs from 'dayjs'

const app = getApp()
const db = app.firestore()

cwContract.events.EthClaimed((err: any, data: any) => {
  console.log(err, data)
})

export const setDeposit = functions.https.onCall(async (deposit, context) => {
  if (!context.auth?.token?.admin) {
    throw new functions.https.HttpsError('unauthenticated', '')
  }

  const tokenCount = await voodollzContract.methods
    .totalSupply()
    .call()
    .then(parseInt)
  const amountPerToken = deposit / tokenCount
  const tokenIds = await voodollzContract
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
        batch.set(doc, { tokenId, value: amountPerToken, lockedUntil: false })
      } else {
        const [doc] = docs
        batch.update(doc.ref, {
          value: firestore.FieldValue.increment(amountPerToken),
        })
      }

      resolve(true)
    })
  })

  await Promise.all(promises).then(() => batch.commit())

  const method = cwContract.methods.deposit()
  const value = web3.utils.toWei(deposit.toString())
  const gas = await estimateGas(method, 0, { value })

  await method.send({ value, gas })
})

export const getDataForClaim = functions.https.onCall(async (_, context) => {
  if (!context.auth?.uid) {
    throw new functions.https.HttpsError('unauthenticated', '')
  }

  const tokensOfOwner = await voodollzContract.methods
    .tokensOfOwner(context.auth.uid)
    .call()
  const depositsSnapshot = await db
    .collection('deposits')
    .where('tokenId', 'in', tokensOfOwner)
    .where('value', '>', 0)
    .where('lockedUntil', '==', false)
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

  const batch = db.batch()

  depositsSnapshot.forEach((doc) => {
    batch.update(doc.ref, { lockedUntil: dayjs().add(10, 'minute').toDate() })
  })

  await batch.commit()

  return {
    amount,
    signature,
    nonce: claimRef.id,
  }
})

export const unlockDeposits = functions.pubsub
  .schedule('every 10 minutes')
  .onRun(async () => {
    const depositsSnapshot = await db
      .collection('deposits')
      .where('lockedUntil', '<', dayjs().toDate())
      .get()

    if (depositsSnapshot.empty) return

    const batch = db.batch()

    depositsSnapshot.forEach((doc) => {
      batch.update(doc.ref, { lockedUntil: false })
    })

    await batch.commit()
  })
