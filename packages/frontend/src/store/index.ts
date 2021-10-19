import { reactive, readonly, App, inject } from 'vue'
import * as metamask from './metamask'
import * as contract from './contract'

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
  }

  const init = async () => {
    // await contract.init()
    // metamask.init()
    // metamask.connect()
  }

  const install = (app: App) => {
    app.provide(StoreSymbol, store)
  }

  return { install, store, init }
}
