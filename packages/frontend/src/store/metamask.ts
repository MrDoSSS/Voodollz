import { isEmpty } from 'lodash'
import { reactive } from 'vue'
import { getUser, createUser, signIn } from '@/firebase/functions'
import { web3 } from './contract'

type State = {
  currentAccount: string | null
  connected: boolean
  metaMaskDetected: boolean
  isOwner: boolean
}

export const state = reactive<State>({
  currentAccount: null,
  connected: false,
  metaMaskDetected: false,
  isOwner: false,
})

export const connect = async () => {
  if (!window.ethereum) return

  try {
    const accounts = await window.ethereum.request?.({
      method: 'eth_requestAccounts',
    })

    await handleAccountsChanged()
  } catch (e) {
    console.error(e)
  }
}

export const disconnect = () => {
  state.currentAccount = null
  state.connected = false
  state.isOwner = false
}

const handleAccountsChanged = async () => {
  state.currentAccount = window.ethereum.selectedAddress
  state.connected = !!window.ethereum.selectedAddress
}

const handleSignMessage = ({
  publicAddress,
  nonce,
}: {
  publicAddress: string
  nonce: number
}) => {
  return web3.eth.personal.sign(
    web3.utils.fromUtf8(`I am signing my nonce: ${nonce}`),
    publicAddress,
    ''
  )
}

const firebaseSignIn = () => {
  const publicAddress = state.currentAccount!
  getUser({ publicAddress })
    .catch(() => createUser({ publicAddress }))
    .then(({ data }) => handleSignMessage(data))
    .then((signature) => signIn({ publicAddress, signature }))
    .then((token) => console.log('TOKEN: ', token))
}

export const init = () => {
  if (!window.ethereum) return

  state.metaMaskDetected = window.ethereum.isMetaMask

  window.ethereum.on('chainChanged', () => window.location.reload())
  window.ethereum.on('accountsChanged', handleAccountsChanged)
  window.ethereum.on('accountsChanged', firebaseSignIn)
}
