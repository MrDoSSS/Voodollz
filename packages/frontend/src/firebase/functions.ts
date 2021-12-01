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

export const setDeposit = httpsCallable<number, string>(
  functions,
  'setDeposit',
  { timeout: 180000 }
)

export const getDataForClaim = httpsCallable<
  void,
  { amount: number; nonce: string; signature: string }
>(functions, 'getDataForClaim')

export const importWhitelist = httpsCallable<{ addresses: string[] }, void>(
  functions,
  'importWhitelist'
)

export const whiteListForAll = httpsCallable<void, string>(
  functions,
  'whiteListForAll'
)

export const deleteAllFromWhitelist = httpsCallable<void, void>(
  functions,
  'deleteAllFromWhitelist'
)
