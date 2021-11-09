import * as functions from 'firebase-functions'
import { app as getApp } from 'firebase-admin'
import { web3, account } from './web3'

const app = getApp()
const db = app.firestore()

export const importWhitelist = functions.https.onCall(async (data, context) => {
  if (!context.auth?.token?.admin) {
    throw new functions.https.HttpsError('unauthenticated', '')
  }

  const { addresses } = data as { addresses: string[] }
  const batch = db.batch()

  addresses.forEach((address) => {
    const { signature } = account.sign(
      web3.utils.keccak256(web3.utils.encodePacked(address)!)
    )

    const doc = db.collection('whitelist').doc()

    batch.create(doc, { address, signature })
  })

  await batch.commit()
})
