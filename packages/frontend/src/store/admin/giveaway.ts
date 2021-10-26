import { reactive } from 'vue'
import { contract } from '@/store/contract'
import { estimateGas, getMintedTokenIds } from '@/utils'
import { giveawayRef, serializeDocs } from '@/firebase/firestore'
import { getDocs, addDoc } from 'firebase/firestore'

type State = {
  docs: Voodollz.DocDataWithId<Voodollz.GiveawayDocData>[]
}

export const state = reactive<State>({
  docs: [],
})

export const fetch = async () => {
  const querySnapshot = await getDocs(giveawayRef)
  const docs = serializeDocs(querySnapshot)
  state.docs = docs
}

export const give = async (address: string) => {
  const method = contract.methods.giveAway(address)
  const gas = await estimateGas(method, 200000)

  const res = await method.send({
    gas,
    maxPriorityFeePerGas: null,
    maxFeePerGas: null,
  })

  const tokenIds = getMintedTokenIds(res.events.Transfer)

  return addDoc(giveawayRef, { address, tokenIds })
}
