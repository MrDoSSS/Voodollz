<script lang="ts" setup>
import Modal from '@/components/Modal.vue'
import { emitter } from '@/event-bus'
import { ref } from 'vue'

const modalEl = ref()

emitter.on('MintPresaleErrorModal:toggle', (value) => {
  if (value) {
    modalEl.value.show()
  } else {
    modalEl.value.hide()
  }
})
</script>

<template>
  <Modal ref="modalEl">
    <template #title><span class="color-red">Ouch!</span></template>
    <div class="mb-2">
      <span class="color-ocean">Mint</span> now available only for
      <span class="color-red">presale members</span>! Join our
      <span class="color-purple">Discord</span> and follow instructions for get
      a membership! Or contact us in <span class="color-blue">Twitter</span>!
    </div>
    <div class="text-center">
      <a
        class="me-2 text-white"
        target="_blank"
        href="https://discord.gg/4txfTDg4z7"
        ><i class="bi bi-discord"></i></a
      ><a
        class="me-2 text-white"
        target="_blank"
        href="https://twitter.com/Voodollz_"
        ><i class="bi bi-twitter"></i
      ></a>
    </div>
  </Modal>
</template>
