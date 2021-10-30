<script setup lang="ts">
import { useStore } from '@/store'

const { admin } = useStore()

admin.giveaway.fetch()
</script>

<template>
  <table class="table table-hover">
    <thead>
      <tr>
        <th>Address</th>
        <th>Token IDs</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, id) in admin.giveaway.state.docs" :key="id">
        <td>{{ item.address }}</td>
        <td>{{ item.tokenId }}</td>
      </tr>
    </tbody>
  </table>
</template>
