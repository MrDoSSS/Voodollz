import { initializeApp } from 'firebase/app'
import { getAuth, connectAuthEmulator } from 'firebase/auth'
import { getFunctions, connectFunctionsEmulator } from 'firebase/functions'
import { getFirestore, connectFirestoreEmulator } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyABDElUqtGeoHeYvk4gPcVldERc5RlcJjM',
  authDomain: 'voodollz.firebaseapp.com',
  projectId: 'voodollz',
  storageBucket: 'voodollz.appspot.com',
  messagingSenderId: '373761124385',
  appId: '1:373761124385:web:f5c4545d49a372a7731b60',
}

export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const functions = getFunctions(app)
export const db = getFirestore(app)

// if (import.meta.env.DEV) {
//   connectAuthEmulator(auth, 'http://localhost:9099')
//   connectFunctionsEmulator(functions, 'localhost', 5001)
//   connectFirestoreEmulator(db, 'localhost', 8080)
// }
