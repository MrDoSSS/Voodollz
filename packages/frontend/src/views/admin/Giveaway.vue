<script setup lang="ts">
import GiveawayTable from '@/components/admin/giveaway/Table.vue'
import AddModal from '@/components/admin/giveaway/AddModal.vue'
import { ref } from 'vue'

const addModal = ref()
</script>

<template>
  <div class="d-flex align-items-center mb-4">
    <h1 class="me-1 mb-0">Giveaway</h1>
    <button class="btn btn-success btn-sm" @click="addModal.show">
      <i class="bi bi-plus"></i>
    </button>
  </div>

  <GiveawayTable />
  <AddModal ref="addModal" />
</template>
