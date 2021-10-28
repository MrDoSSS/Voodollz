<script setup lang="ts">
import Loader from '@/components/Loader.vue'
import Sidebar from '@/components/admin/sidebar/Sidebar.vue'
</script>

<template>
  <Loader />

  <div class="admin vh-100 d-flex flex-column">
    <main class="d-flex flex-grow-1">
      <Sidebar />
      <div class="admin__content p-1 p-sm-2 flex-grow-1">
        <div class="container">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>
