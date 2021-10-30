import { reactive } from 'vue'
import { voodollz } from '@/store/contract'
import { estimateGas, getMintedTokenIds } from '@/utils'
import { giveawayRef } from '@/firebase/firestore'
import { onSnapshot, addDoc } from 'firebase/firestore'

type State = {
  docs: Record<string, Voodollz.GiveawayDocData>
  fetched: boolean
}

export const state = reactive<State>({
  docs: {},
  fetched: false,
})
export const fetch = async () => {
  onSnapshot(
    giveawayRef,
    { includeMetadataChanges: true },
    (querySnapshot) => {
      querySnapshot.docChanges().forEach((change) => {
        console.log(change)
        if (change.type === 'removed') {
          delete state.docs[change.doc.id]
        } else {
          state.docs[change.doc.id] == change.doc.data()
        }
      })
    },
    console.error,
    () => (state.fetched = true)
  )
}

export const give = async (address: string) => {
  const method = voodollz.methods.giveAway(address)
  const gas = await estimateGas(method, 200000)

  const res = await method.send({
    gas,
    maxPriorityFeePerGas: null,
    maxFeePerGas: null,
  })

  const [tokenId] = getMintedTokenIds(res.events.Transfer)

  return addDoc(giveawayRef, { address, tokenId })
}
