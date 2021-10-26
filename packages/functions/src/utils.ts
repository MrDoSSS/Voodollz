import type { firestore } from 'firebase-admin/lib/firestore'

export const generateNonce = () =>
  Math.floor(Math.random() * (9999 - 1000) + 1000)

export const deleteCollection = async (
  db: firestore.Firestore,
  collectionPath: string,
  batchSize: number
) => {
  const collectionRef = db.collection(collectionPath)
  const query = collectionRef.orderBy('__name__').limit(batchSize)

  return new Promise((resolve, reject) => {
    deleteQueryBatch(db, query, resolve).catch(reject)
  })
}

const deleteQueryBatch = async (
  db: firestore.Firestore,
  query: firestore.Query,
  resolve: (value?: unknown) => void
) => {
  const snapshot = await query.get()

  if (snapshot.size === 0) return resolve()

  const batch = db.batch()
  snapshot.docs.forEach((doc) => batch.delete(doc.ref))
  await batch.commit()

  process.nextTick(() => deleteQueryBatch(db, query, resolve))
}
