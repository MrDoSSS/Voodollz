<script setup lang="ts">
import ModalLoader from '@/components/admin/ModalLoader.vue'
import { useModal } from '@/composables/modal'
import { useGiveawayForm } from '@/composables/giveaway-form'

const { modalEl, showModal, hideModal } = useModal()
const { address, error, give, loading } = useGiveawayForm()

const submit = () => give().then(hideModal).catch(console.error)

defineExpose({
  show: showModal,
  hide: hideModal,
})
</script>

<template>
  <div class="modal" tabindex="-1" ref="modalEl">
    <div class="modal-dialog">
      <form @submit.prevent="submit">
        <div class="modal-content">
          <ModalLoader v-if="loading" />
          <div class="modal-header">
            <h5 class="modal-title">Giveaway</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div class="modal-body">
            <div class="alert alert-danger mb-3" role="alert" v-if="error">
              {{ error }}
            </div>
            <div class="form-floating">
              <input
                class="form-control"
                placeholder=" "
                id="add-modal-addresses"
                v-model="address"
                required
              />
              <label for="add-modal-addresses">Address</label>
            </div>
          </div>
          <div class="modal-footer">
            <button class="btn btn-primary">Give</button>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>
