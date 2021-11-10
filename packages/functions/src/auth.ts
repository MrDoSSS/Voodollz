import * as functions from 'firebase-functions'
import { recoverPersonalSignature } from '@metamask/eth-sig-util'
import { app as getApp } from 'firebase-admin'
import { utf8ToHex } from 'web3-utils'
import { generateNonce } from './utils'
import { account } from './web3'

const app = getApp()
const auth = app.auth()

export const getUser = functions.https.onCall(async (data) => {
  try {
    const { publicAddress } = data
    const user = await auth.getUser(publicAddress)

    return {
      publicAddress,
      nonce: user.customClaims?.custonNonce,
    }
  } catch {
    throw new functions.https.HttpsError('not-found', '')
  }
})

export const createUser = functions.https.onCall(async (data) => {
  const { publicAddress } = data
  const custonNonce = generateNonce()
  const admin = account.address.toLowerCase() === publicAddress.toLowerCase()

  await auth.createUser({ uid: publicAddress })
  await auth.setCustomUserClaims(publicAddress, { custonNonce, admin })

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
  const admin = account.address.toLowerCase() === publicAddress.toLowerCase()

  if (address.toLowerCase() === publicAddress.toLowerCase()) {
    const token = await auth.createCustomToken(publicAddress)
    await auth.setCustomUserClaims(publicAddress, {
      custonNonce: generateNonce(),
      admin,
    })
    return token
  } else {
    throw new functions.https.HttpsError('unauthenticated', '')
  }
})
