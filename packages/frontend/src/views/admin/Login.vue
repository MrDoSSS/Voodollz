<script lang="ts" setup>
import { useStore } from '@/store'
import { useRouter } from 'vue-router'

const { metamask, firebase } = useStore()
const router = useRouter()

const signIn = async () => {
  await metamask.connect()
  await firebase.auth.signIn()
  router.replace({ name: 'admin-index' })
}
</script>
<template>
  <div
    class="
      vw-100
      vh-100
      bg-dark
      d-flex
      justify-content-center
      align-items-center
    "
  >
    <button class="btn btn-primary btn-lg" @click="signIn">Sign in</button>
  </div>
</template>
