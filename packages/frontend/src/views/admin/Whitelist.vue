<script setup lang="ts">
import WhitelistTable from '@/components/admin/whitelist/Table.vue'
import AddModal from '@/components/admin/whitelist/AddModal.vue'
import { ref } from 'vue'
import { importWhitelist } from '@/firebase/functions'
import { parse } from 'papaparse'
import { useStore } from '@/store'
import { deleteAllFromWhitelist } from '@/firebase/functions'

const { contract } = useStore()
const addModal = ref()

const importFromCsv = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.item(0)

  if (!file) return

  parse<[string, string, string, string]>(file, {
    complete(res) {
      const data = res.data.map((arr) => arr[1]?.toLowerCase())
      const addresses = data.filter(contract.web3.utils.isAddress)
      importWhitelist({ addresses })
    },
  })
}

const deleteAll = () => {
  const isSure = confirm('You are sure?')

  if (isSure) {
    deleteAllFromWhitelist()
  }
}
</script>

<template>
  <div class="d-flex align-items-center mb-4">
    <h1 class="me-1 mb-0">Whitelist</h1>
    <button class="btn btn-success btn-sm" @click="addModal.show">
      <i class="bi bi-plus"></i>
    </button>
    <div class="ms-auto">
      <button class="btn btn-danger btn-sm me-1" @click="deleteAll">
        <i class="bi bi-trash"></i>
        Delete all
      </button>
      <label class="btn btn-primary btn-sm">
        <i class="bi bi-upload me-1"></i>
        Import <input type="file" class="d-none" @input="importFromCsv" />
      </label>
    </div>
  </div>

  <WhitelistTable />
  <AddModal ref="addModal" />
</template>
