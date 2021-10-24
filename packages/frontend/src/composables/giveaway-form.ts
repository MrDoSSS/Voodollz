import { useStore } from '@/store'
import { ref } from 'vue'

export const useGiveawayForm = () => {
  const { admin } = useStore()
  const loading = ref(false)

  const address = ref('')
  const error = ref('')

  const give = async () => {
    try {
      loading.value = true
      await admin.giveaway.give(address.value)
      reset()
    } catch (e: any) {
      error.value = e.message
      throw e
    } finally {
      loading.value = false
    }
  }

  const reset = () => {
    address.value = ''
    error.value = ''
  }

  return { give, reset, error, address, loading }
}
