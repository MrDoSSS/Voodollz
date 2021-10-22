<script setup lang="ts">
import uniqueId from 'lodash/uniqueId'
import Tooltip from '@/components/Tooltip.vue'

const props = defineProps({
  to: String,
  icon: String,
  title: String,
})
const id = uniqueId('nav_item_')
</script>

<template>
  <li class="nav-item">
    <router-link
      class="d-block p-2 nav-link link-light text-decoration-none"
      :to="{ name: to }"
      :id="id"
      ><i :class="`bi ${icon}`"></i>
    </router-link>
    <Tooltip :target="`#${id}`">{{ title }}</Tooltip>
  </li>
</template>

<style scoped>
.nav-link {
  border-radius: 0;
}
</style>
