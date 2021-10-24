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
      <tr v-for="(item, i) in admin.giveaway.state.docs" :key="i">
        <td>{{ item.address }}</td>
        <td>{{ item.tokenIds }}</td>
      </tr>
    </tbody>
  </table>
</template>
