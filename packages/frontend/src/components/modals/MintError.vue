<script lang="ts" setup>
import Modal from '@/components/Modal.vue'
import { emitter } from '@/event-bus'
import { ref } from 'vue'

const modalEl = ref()

emitter.on('MintErrorModal:toggle', (value) => {
  if (value) {
    modalEl.value.show()
  } else {
    modalEl.value.hide()
  }
})
</script>

<template>
  <Modal class="modal-error" ref="modalEl">
    <template #title><span class="color-red">Oh no!</span></template>
    <div class="text-center">Something goes wrong!</div>
  </Modal>
</template>

<style lang="scss">
.modal-error {
  .modal-content {
    justify-content: center;
  }

  .modal-body {
    flex: 0;
  }

  .modal-header {
    margin-bottom: 0;
  }
}
</style>
