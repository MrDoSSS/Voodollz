import * as functions from 'firebase-functions'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import { app as getApp } from 'firebase-admin'
import { utf8ToHex } from 'web3-utils'

const generateNonce = () => Math.floor(Math.random() * (9999 - 1000) + 1000)
const app = getApp()
const auth = app.auth()

export const getUser = functions.https.onCall(async (data) => {
  const { publicAddress } = data
  const user = await auth.getUser(publicAddress)

  if (user) {
    return {
      publicAddress,
      nonce: user.customClaims?.custonNonce,
    }
  } else {
    throw new functions.https.HttpsError('not-found', '')
  }
})

export const createUser = functions.https.onCall(async (data) => {
  const { publicAddress } = data
  const custonNonce = generateNonce()

  await auth.createUser({ uid: publicAddress })
  await auth.setCustomUserClaims(publicAddress, { custonNonce })

  return {
    publicAddress,
    nonce: custonNonce,
  }
})

export const getAuthToken = functions.https.onCall(async (data) => {
  const { publicAddress, signature } = data
  const user = await auth.getUser(publicAddress)

  if (!user) throw new functions.https.HttpsError('not-found', '')

  const msg = `I am signing my nonce: ${user.customClaims?.custonNonce}`
  const address = recoverPersonalSignature({
    data: utf8ToHex(msg),
    signature,
  })

  if (address.toLowerCase() === publicAddress.toLowerCase()) {
    const token = await auth.createCustomToken(publicAddress)
    await auth.setCustomUserClaims(publicAddress, {
      custonNonce: generateNonce(),
    })
    return token
  } else {
    throw new functions.https.HttpsError('unauthenticated', '')
  }
})
