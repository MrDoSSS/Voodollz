<script setup lang="ts">
import WhitelistTable from '@/components/admin/whitelist/Table.vue'
import AddModal from '@/components/admin/whitelist/AddModal.vue'
import { ref } from 'vue'

const addModal = ref()
</script>

<template>
  <div class="d-flex align-items-center mb-1">
    <h1 class="me-1 mb-0">Whitelist</h1>
    <button class="btn btn-success btn-sm" @click="addModal.show">
      <i class="bi bi-plus"></i>
    </button>
  </div>

  <WhitelistTable />
  <AddModal ref="addModal" />
</template>
