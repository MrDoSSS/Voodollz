import { FirestoreDataConverter } from 'firebase/firestore'

export const giveawayConverter: FirestoreDataConverter<Voodollz.GiveawayDocData> =
  {
    toFirestore(modelObject) {
      return modelObject
    },
    fromFirestore(snapshot, options) {
      const { address, tokenIds } = snapshot.data(options)
      return {
        address,
        tokenIds,
      }
    },
  }

export const whitelistConverter: FirestoreDataConverter<Voodollz.WhitelistDocData> =
  {
    toFirestore(modelObject) {
      return modelObject
    },
    fromFirestore(snapshot, options) {
      const { address, signature } = snapshot.data(options)
      return {
        address,
        signature,
      }
    },
  }
