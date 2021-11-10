<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount } from 'vue'
import { useStore } from '@/store'

const { metamask } = useStore()

onBeforeMount(() => document.documentElement.classList.add('base-layout'))

onBeforeUnmount(() => document.documentElement.classList.remove('base-layout'))
</script>

<template>
  <div class="admin-btn position-fixed z-index" v-if="metamask.state.isOwner">
    <router-link class="btn btn-success" :to="{ name: 'admin-index' }"
      >Admin panel</router-link
    >
  </div>

  <router-view />
</template>

<style lang="scss">
html.base-layout {
  --bs-body-line-height: 1.3;
  --bs-body-bg: #0c0c0c;
  --bs-font-sans-serif: 'PT Sans Caption', sans-serif;
  --bs-body-color: #fff;
  --bs-body-line-height: 1.5;

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    font-family: 'Risque', cursive;
  }
}

.admin-btn {
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}
</style>
