import { reactive, readonly, App, inject } from 'vue'
import * as wallet from './wallet'
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
    wallet,
    contract,
    admin,
    auth,
  }

  const init = async () => {
    auth.init()
  }

  const install = (app: App) => {
    app.provide(StoreSymbol, store)
  }

  return { install, store, init }
}
