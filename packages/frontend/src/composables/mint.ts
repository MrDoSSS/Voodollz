import { ref, computed } from 'vue'
import { useStore } from '@/store'
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
  const status = ref<
    'init' | 'error' | 'success' | 'presale-error' | 'amount-error'
  >('init')
  const loading = ref(false)

  const inc = () =>
    (amount.value = amount.value >= 3 ? amount.value : amount.value + 1)
  const dec = () =>
    (amount.value = amount.value <= 1 ? amount.value : amount.value - 1)

  const price = computed(() =>
    contract.web3.utils.fromWei(
      (contract.state.price * amount.value).toString()
    )
  )

  const reset = () => (status.value = 'init')

  const mint = async () => {
    try {
      loading.value = true

      if (!metamask.state.connected) {
        await metamask.connect()
      }

      if (contract.state.presaled) {
        await auth.signIn()

        const signature = await getSignature(metamask.state.currentAccount!)

        if (!signature) {
          status.value = 'presale-error'
          return
        }

        const tokenCount = await contract.voodollz.methods
          .presaleTokenOwnersCounter(metamask.state.currentAccount!)
          .call()

        if (tokenCount + amount.value > 6) {
          status.value = 'amount-error'
          return
        }

        await contract.presaleMint(amount.value, signature)
      } else {
        const tokenCount = await contract.voodollz.methods
          .tokenOwnersCounter(metamask.state.currentAccount!)
          .call()

        if (tokenCount + amount.value > 5) {
          status.value = 'amount-error'
          return
        }

        await contract.mint(amount.value)
      }

      status.value = 'success'
    } catch (e) {
      console.log(e)
      status.value = 'error'
    } finally {
      loading.value = false
    }
  }

  return { amount, mint, dec, inc, price, status, loading, reset }
}
