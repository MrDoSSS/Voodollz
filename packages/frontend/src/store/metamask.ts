import { reactive } from 'vue'
import { voodollz, cw } from './contract'

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
    await window.ethereum.request?.({ method: 'eth_requestAccounts' })

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
  voodollz.options.from = state.currentAccount
  // cw.options.from = state.currentAccount

  const owner = await voodollz.methods.owner().call()
  state.isOwner = owner.toLowerCase() === state.currentAccount.toLowerCase()
}

export const init = () => {
  if (!window.ethereum) return

  state.metaMaskDetected = window.ethereum.isMetaMask

  window.ethereum.on('chainChanged', () => window.location.reload())
  window.ethereum.on('accountsChanged', handleAccountsChanged)
}
