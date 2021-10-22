import { getUser, createUser, getAuthToken } from '@/firebase/functions'
import {
  signIn as firebaseSignIn,
  signOut,
  authStateChanged,
} from '@/firebase/auth'
import { state as metamaskState } from '@/store/metamask'
import { web3 } from '@/store/contract'
import { watch, reactive } from 'vue'
import { User } from 'firebase/auth'

type State = {
  user: User | null
}

export const state = reactive<State>({
  user: null,
})

export const init = () => {
  watch(
    () => metamaskState.currentAccount,
    () => signOut().then(signIn)
  )

  authStateChanged((user) => {
    state.user = Object.freeze(user)
  })
}

const signIn = () => {
  const publicAddress = metamaskState.currentAccount

  if (!publicAddress) return

  getUser({ publicAddress })
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
}
