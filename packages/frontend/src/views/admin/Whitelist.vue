<script setup lang="ts">
import WhitelistTable from '@/components/admin/whitelist/Table.vue'
import AddModal from '@/components/admin/whitelist/AddModal.vue'
import { ref } from 'vue'
import { importWhitelist } from '@/firebase/functions'
import { parse } from 'papaparse'
import { useStore } from '@/store'

const { contract } = useStore()
const addModal = ref()

const importFromCsv = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.item(0)

  if (!file) return

  parse<[string, string, string, string]>(file, {
    complete(res) {
      const data = res.data.map((arr) => arr[1])
      const addresses = data.filter(contract.web3.utils.isAddress)
      importWhitelist({ addresses })
    },
  })
}
</script>

<template>
  <div class="d-flex align-items-center mb-4">
    <h1 class="me-1 mb-0">Whitelist</h1>
    <button class="btn btn-success btn-sm" @click="addModal.show">
      <i class="bi bi-plus"></i>
    </button>
    <label class="btn btn-primary btn-sm ms-auto">
      <i class="bi bi-upload me-1"></i>
      Import <input type="file" class="d-none" @input="importFromCsv" />
    </label>
  </div>

  <WhitelistTable />
  <AddModal ref="addModal" />
</template>
