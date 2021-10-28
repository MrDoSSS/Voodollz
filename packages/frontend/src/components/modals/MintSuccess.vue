<script lang="ts" setup>
import Modal from '@/components/Modal.vue'
import { emitter } from '@/event-bus'
import { ref } from 'vue'

const modalEl = ref()

emitter.on('MintSuccessModal:toggle', (value) => {
  if (value) {
    modalEl.value.show()
  } else {
    modalEl.value.hide()
  }
})
</script>

<template>
  <Modal ref="modalEl">
    <template #title>Congratulations!</template>
    <div class="mb-2">
      Now you has unique <span class="color-red">Voodoll</span>! You can see
      other on Opensea, or show yourself in our Discord channel!
    </div>
    <div class="text-center mb-2">
      <a target="_blank" href="https://opensea.io/collection/voodollz"
        ><img src="/opensea.svg"
      /></a>
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
