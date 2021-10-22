import { db } from './index'
import { collection, QuerySnapshot, DocumentData } from 'firebase/firestore'

export const whitelistRef = collection(db, 'whitelist')

export const serializeDocs = (snapshot: QuerySnapshot<DocumentData>) => {
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  }))
}
