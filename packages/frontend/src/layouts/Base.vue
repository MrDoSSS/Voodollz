<script lang="ts" setup>
import { onBeforeMount, onBeforeUnmount } from 'vue'

onBeforeMount(() => document.documentElement.classList.add('base-layout'))

onBeforeUnmount(() => document.documentElement.classList.remove('base-layout'))
</script>

<template>
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
</style>
