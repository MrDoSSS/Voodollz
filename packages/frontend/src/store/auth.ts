import { getUser, createUser, getAuthToken } from '@/firebase/functions'
import { auth } from '@/firebase'
import {
  signIn as firebaseSignIn,
  signOut,
  authStateChanged,
} from '@/firebase/auth'
import { state as metamaskState } from '@/store/metamask'
import { web3 } from '@/store/contract'
import { watch, reactive, computed } from 'vue'
import { User } from 'firebase/auth'

type State = {
  user: User | null
  admin: boolean
}

export const state = reactive<State>({
  user: null,
  admin: false,
})

export const init = () => {
  watch(
    () => metamaskState.currentAccount,
    () => signOut()
  )

  authStateChanged(async (user) => {
    state.user = Object.freeze(user)
    if (!auth.currentUser) return

    const { claims } = await auth.currentUser.getIdTokenResult()
    // state.admin = claims.admin
  })
}

export const loggedIn = computed(() => !!state.user)

export const signIn = () => {
  const publicAddress = metamaskState.currentAccount

  if (!publicAddress) return

  return new Promise(async (resolve, reject) => {
    try {
      await getUser({ publicAddress })
        .catch(() => createUser({ publicAddress }))
        .then(({ data }) => {
          const { publicAddress, nonce } = data

          return web3.eth.personal.sign(
            web3.utils.utf8ToHex(`I am signing my nonce: ${nonce}`),
            publicAddress,
            ''
          )
        })
        .then((signature) => getAuthToken({ publicAddress, signature }))
        .then(({ data }) => firebaseSignIn(data))

      authStateChanged((user) => (user ? resolve(user) : reject()))
    } catch (e) {
      reject(e)
    }
  })
}
