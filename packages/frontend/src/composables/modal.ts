import { Modal } from 'bootstrap'
import { onMounted, ref } from 'vue'

export const useModal = () => {
  const modalEl = ref<HTMLElement>()
  let modal: Modal | undefined

  onMounted(() => {
    if (modalEl.value instanceof HTMLElement) {
      modal = new Modal(modalEl.value)
    }
  })

  const showModal = () => modal?.show()
  const hideModal = () => modal?.hide()

  return { modal, modalEl, showModal, hideModal }
}
