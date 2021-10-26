import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { emitter } from '@/event-bus'
import { whitelistRef, serializeDocs } from '@/firebase/firestore'
import { query, getDocs, where } from '@firebase/firestore'

const getSignature = async (address: string) => {
  const q = query(whitelistRef, where('address', '==', address.toLowerCase()))
  const querySnapshot = await getDocs(q)
  const [doc] = serializeDocs(querySnapshot)

  return doc?.signature
}

export const useMint = () => {
  const { metamask, contract, auth } = useStore()
  const amount = ref(1)

  const inc = () =>
    (amount.value = amount.value >= 20 ? amount.value : amount.value + 1)
  const dec = () =>
    (amount.value = amount.value <= 1 ? amount.value : amount.value - 1)

  const price = computed(() => contract.priceInEth.value * amount.value)

  const mint = async () => {
    try {
      emitter.emit('Loader:toggle', true)

      if (!metamask.state.connected) {
        await metamask.connect()
      }

      if (contract.state.presaled) {
        await auth.signIn()

        const signature = await getSignature(metamask.state.currentAccount!)

        if (!signature) return

        await contract.presaleMint(amount.value, signature)
      } else {
        await contract.mint(amount.value)
      }

      emitter.emit('MintSuccessModal:toggle', true)
    } catch (e) {
      console.log(e)
      emitter.emit('MintErrorModal:toggle', true)
    } finally {
      emitter.emit('Loader:toggle', false)
    }
  }

  return { amount, mint, dec, inc, price }
}
