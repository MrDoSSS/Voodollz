<script setup lang="ts">
import { emitter } from '@/event-bus'
import { useStore } from '@/store'
import { ref } from 'vue'

const { admin } = useStore()

const paused = ref(false)
const presaled = ref(false)

admin.settings.fetchAll().then(() => {
  paused.value = admin.settings.state.paused
  presaled.value = admin.settings.state.presaled
})

const savePause = () => {
  emitter.emit('Loader:toggle', true)
  admin.settings
    .setPause(paused.value)
    .catch(() => (paused.value = !paused.value))
    .finally(() => emitter.emit('Loader:toggle', false))
}

const savePresale = () => {
  emitter.emit('Loader:toggle', true)
  admin.settings
    .setPresale(presaled.value)
    .catch(() => (presaled.value = !presaled.value))
    .finally(() => emitter.emit('Loader:toggle', false))
}
</script>

<template>
  <h1 class="mb-4">Settings</h1>

  <div class="card">
    <h5 class="card-header">Other</h5>
    <div class="card-body">
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="pause-input"
          v-model="paused"
          @change="savePause"
        />
        <label class="form-check-label" for="pause-input">Pause</label>
      </div>
      <div class="form-check form-switch">
        <input
          class="form-check-input"
          type="checkbox"
          id="pause-input"
          v-model="presaled"
          @change="savePresale"
        />
        <label class="form-check-label" for="pause-input">Presale</label>
      </div>
    </div>
  </div>
</template>
