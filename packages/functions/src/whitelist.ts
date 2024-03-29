import * as functions from 'firebase-functions'
import { app as getApp } from 'firebase-admin'
import { web3, account } from './web3'
import { deleteCollection } from './utils'

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

export const whiteListForAll = functions.https.onCall(async (data, context) => {
  if (!context.auth?.uid) {
    throw new functions.https.HttpsError('unauthenticated', '')
  }

  const { signature } = account.sign(
    web3.utils.keccak256(web3.utils.encodePacked(context.auth.uid)!)
  )

  return signature
})

export const deleteAllFromWhitelist = functions.https.onCall(
  async (data, context) => {
    if (!context.auth?.token?.admin) {
      throw new functions.https.HttpsError('unauthenticated', '')
    }

    await deleteCollection(db, 'whitelist', 400)
  }
)
