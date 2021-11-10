<script lang="ts" setup>
import { useModal } from '@/composables/modal'
import { onUnmounted } from 'vue'

const { modalEl, showModal, hideModal } = useModal()

onUnmounted(hideModal)

defineExpose({
  show: showModal,
  hide: hideModal,
})
</script>

<template>
  <div class="modal" tabindex="-1" ref="modalEl">
    <div class="modal-dialog modal-dialog-centered">
      <div class="modal-content">
        <div class="modal-header">
          <h3 class="modal-title"><slot name="title" /></h3>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <slot />
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.modal {
  &-dialog {
    max-width: 55rem;
  }

  &-content {
    border-radius: 3rem 3.5rem 3.5rem 3.5rem;
    filter: drop-shadow(0px 4px 4px rgba(0, 0, 0, 0.25));
    border: none;
    padding: 1.5rem 0 3.5rem;
    min-height: 25rem;
    background-color: rgba(13, 29, 34, 1);
  }

  &-title {
    font-size: 3rem;
  }

  &-header {
    border-bottom: none;
    border-radius: 0;
    padding: 0;
    margin-bottom: 2.2rem;
    justify-content: center;
    align-items: center;

    .btn-close {
      position: absolute;
      top: 2.5rem;
      right: 1.5rem;
      background: url("data:image/svg+xml,%3Csvg width='35' height='36' viewBox='0 0 35 36' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M10.3633 2C10.4433 14.1274 11.4642 28.3514 23.6647 34.4957' stroke='white' stroke-width='3' stroke-linecap='round'/%3E%3Cpath d='M27.3364 11.8377C21.9857 14.5572 17.6724 18.4202 12.1262 20.9099C8.37303 22.5948 5.65838 22.8519 1.80244 22.8408' stroke='white' stroke-width='3' stroke-linecap='round'/%3E%3C/svg%3E%0A");
      opacity: 1;
      width: 3.4rem;
      height: 3.4rem;
      background-repeat: no-repeat;
      background-size: contain;
      padding: 0;
    }
  }

  &-body {
    padding: 0 7rem;
  }
}
</style>
