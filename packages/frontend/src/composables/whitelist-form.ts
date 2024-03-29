import { useStore } from '@/store'
import { ref } from 'vue'

export const useWhitelistForm = () => {
  const { admin } = useStore()
  const loading = ref(false)

  const address = ref('')
  const error = ref('')

  const add = async () => {
    try {
      loading.value = true
      await admin.whitelist.add(address.value)
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

  return { add, reset, error, address, loading }
}
