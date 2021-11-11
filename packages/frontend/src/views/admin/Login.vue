<script lang="ts" setup>
import { useStore } from '@/store'
import { useRouter } from 'vue-router'
import { setMetamaskProvider } from '@/ethereum'
const { wallet, auth, contract } = useStore()
const router = useRouter()

const signIn = async () => {
  setMetamaskProvider()
  await contract.init()
  wallet.init()
  await wallet.connect()
  await auth.signIn()
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
