import { initializeApp } from 'firebase-admin'
import { initAccountOwner } from './web3'

initAccountOwner()
initializeApp()

export * from './auth'
export * from './deposit'
