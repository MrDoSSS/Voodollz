import { httpsCallable } from 'firebase/functions'
import { functions } from './index'

export const getUser = httpsCallable<
  { publicAddress: string },
  { publicAddress: string; nonce: number }
>(functions, 'getUser')

export const createUser = httpsCallable<
  { publicAddress: string },
  { publicAddress: string; nonce: number }
>(functions, 'createUser')

export const getAuthToken = httpsCallable<
  { publicAddress: string; signature: string },
  string
>(functions, 'getAuthToken')
