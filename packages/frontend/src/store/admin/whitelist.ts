import { reactive } from 'vue'
import { whitelistRef } from '@/firebase/firestore'
import { addDoc, deleteDoc, doc, onSnapshot } from 'firebase/firestore'
import { web3 } from '@/store/contract'
import { state as metamaskState } from '@/store/metamask'

type State = {
  docs: Record<string, Voodollz.WhitelistDocData>
  fetched: boolean
}

export const state = reactive<State>({
  docs: {},
  fetched: false,
})

export const fetch = () => {
  if (state.fetched) return

  onSnapshot(
    whitelistRef,
    { includeMetadataChanges: true },
    (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        if (change.type === 'removed') {
          delete state.docs[change.doc.id]
        } else {
          state.docs[change.doc.id] = change.doc.data()
        }
      })
    },
    console.error,
    () => (state.fetched = true)
  )
}

export const add = async (address: string) => {
  address = address.toLowerCase()

  const signature = await web3.eth.personal.sign(
    web3.utils.keccak256(address),
    metamaskState.currentAccount!,
    ''
  )

  return addDoc(whitelistRef, { address, signature })
}

export const remove = (id: string) => {
  deleteDoc(doc(whitelistRef, id))
}
