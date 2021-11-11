import { reactive } from 'vue'
import { voodollz, cw } from './contract'
import { ethereum } from '@/ethereum'

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
  if (!ethereum) return

  try {
    await ethereum.request?.({ method: 'eth_requestAccounts' })

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
  if (!ethereum) return

  state.currentAccount = ethereum.selectedAddress!
  state.connected = !!ethereum.selectedAddress!

  if (state.currentAccount) {
    voodollz.options.from = state.currentAccount
    // cw.options.from = state.currentAccount

    const owner = await voodollz.methods.owner().call()
    state.isOwner = owner.toLowerCase() === state.currentAccount.toLowerCase()
  }
}

export const init = () => {
  if (!ethereum) return

  state.metaMaskDetected = ethereum.isMetaMask

  ethereum.on('chainChanged', () => window.location.reload())
  ethereum.on('accountsChanged', handleAccountsChanged)
}
