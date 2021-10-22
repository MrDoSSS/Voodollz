<script lang="ts" setup>
import { useStore } from '@/store'

const { firebase } = useStore()
</script>

<template>
  <h1 class="mb-4">Test</h1>
  {{ firebase.auth.state.user }}
</template>

<style lang="scss"></style>
