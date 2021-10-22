import { reactive, readonly, App, inject } from 'vue'
import * as metamask from './metamask'
import * as contract from './contract'
import * as firebase from './firebase'

const StoreSymbol = Symbol('store')

export const useStore = (): Voodollz.AppStore => {
  return inject(StoreSymbol) as Voodollz.AppStore
}

export const createStore = () => {
  const state = reactive({})

  const store = {
    state: readonly(state),
    metamask,
    contract,
    firebase,
  }

  const init = async () => {
    if (import.meta.env.DEV) {
      await contract.init()
      metamask.init()
      metamask.connect()
      firebase.auth.init()
    }
  }

  const install = (app: App) => {
    app.provide(StoreSymbol, store)
  }

  return { install, store, init }
}
