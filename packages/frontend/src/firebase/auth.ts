import { auth } from './index'
import {
  signInWithCustomToken,
  signOut as firebaseSignOut,
  onAuthStateChanged,
  User,
  NextOrObserver,
} from 'firebase/auth'

export const signIn = (token: string) => signInWithCustomToken(auth, token)
export const signOut = () => firebaseSignOut(auth)
export const authStateChanged = (cb: NextOrObserver<User>) =>
  onAuthStateChanged(auth, cb)
