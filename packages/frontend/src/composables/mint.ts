import { ref, computed } from 'vue'
import { useStore } from '@/store'
import { emitter } from '@/event-bus'

export const useMint = () => {
  const { metamask, contract } = useStore()
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

      if (contract.state.presaled && !contract.state.inWhitelist) {
        return emitter.emit('MintPresaleErrorModal:toggle', true)
      }

      await contract.mint(amount.value)

      emitter.emit('MintSuccessModal:toggle', true)
    } catch (e) {
      emitter.emit('MintErrorModal:toggle', true)
    } finally {
      emitter.emit('Loader:toggle', false)
    }
  }

  return { amount, mint, dec, inc, price }
}
