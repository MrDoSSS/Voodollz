import { reactive } from 'vue'
import { whitelistRef, serializeDocs } from '@/firebase/firestore'
import { getDocs, addDoc, deleteDoc, doc } from 'firebase/firestore'
import { web3 } from '@/store/contract'
import { state as metamaskState } from '@/store/metamask'

type State = {
  docs: Voodollz.DocDataWithId<Voodollz.WhitelistDocData>[]
}

export const state = reactive<State>({
  docs: [],
})

export const fetch = async () => {
  const querySnapshot = await getDocs(whitelistRef)
  const docs = serializeDocs(querySnapshot)
  state.docs = docs
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
