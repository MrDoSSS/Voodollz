<script setup lang="ts">
import { useStore } from '@/store'
import { emitter } from '@/event-bus'

const { admin } = useStore()
admin.stat.fetchAll()

const withdraw = () => {
  emitter.emit('Loader:toggle', true)
  admin.withdraw().finally(() => emitter.emit('Loader:toggle', false))
}
</script>

<template>
  <h1 class="mb-4">Statistics</h1>
  <div class="row">
    <div class="col-md-6 col-lg-4">
      <div class="card shadow h-100">
        <div class="card-body">
          <h5 class="card-title">Balance</h5>
          <p class="card-text">{{ admin.stat.state.balance }} eth</p>
          <button class="btn btn-primary" @click="withdraw">Withdraw</button>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-lg-4">
      <div class="card shadow h-100">
        <div class="card-body">
          <h5 class="card-title">Total supply</h5>
          <p class="card-text">{{ admin.stat.state.totalSupply }}</p>
        </div>
      </div>
    </div>
  </div>
</template>
