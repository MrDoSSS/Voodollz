import { reactive, readonly, App, inject } from 'vue'
import * as metamask from './metamask'
import * as contract from './contract'
import * as admin from './admin'
import * as auth from './auth'

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
    admin,
    auth,
  }

  const init = async () => {
    if (import.meta.env.DEV) {
      await contract.init()
      metamask.init()
      auth.init()
    }
  }

  const install = (app: App) => {
    app.provide(StoreSymbol, store)
  }

  return { install, store, init }
}
