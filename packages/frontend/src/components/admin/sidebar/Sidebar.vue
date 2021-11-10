<script setup lang="ts">
import NavItem from './NavItem.vue'
</script>

<template>
  <div
    class="
      sidebar
      d-flex
      flex-column
      justify-content-between
      flex-shrink-0
      text-white
      bg-dark
    "
  >
    <ul class="nav nav-pills flex-column mb-auto text-center">
      <NavItem icon="bi-speedometer2" to="admin-index" title="Statistics" />
      <NavItem
        icon="bi-person-lines-fill"
        to="admin-whitelist-index"
        title="Whitelist"
      />
      <NavItem icon="bi-gift" to="admin-giveaway-index" title="Giveaway" />
      <NavItem icon="bi-gear" to="admin-settings-index" title="Settings" />
    </ul>
    <ul class="nav nav-pills flex-column text-center">
      <NavItem icon="bi-house" to="home" title="Back to site" />
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.sidebar {
  font-size: 1.75em;
  position: fixed;
  left: 0;
  top: 0;
  bottom: 0;
}
</style>
