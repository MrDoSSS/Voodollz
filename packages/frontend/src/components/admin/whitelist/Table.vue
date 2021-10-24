<script setup lang="ts">
import { useStore } from '@/store'

const { admin } = useStore()

admin.whitelist.fetch()
</script>

<template>
  <table class="table table-hover align-middle">
    <thead>
      <tr>
        <th>Address</th>
        <th></th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(item, i) in admin.whitelist.state.docs" :key="i">
        <td>{{ item.address }}</td>
        <td class="text-end">
          <button
            class="btn btn-danger"
            @click="admin.whitelist.remove(item.id)"
          >
            <i class="bi bi-trash"></i>
          </button>
        </td>
      </tr>
    </tbody>
  </table>
</template>
