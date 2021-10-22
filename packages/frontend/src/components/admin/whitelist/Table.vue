<script setup lang="ts">
import { useStore } from '@/store'

const { firebase } = useStore()

firebase.whitelist.fetch()
</script>

<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Address</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in firebase.whitelist.state.docs" :key="i">
        <td>{{ item.address }}</td>
        <td>
          <button @click="firebase.whitelist.remove(item.id)">
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
