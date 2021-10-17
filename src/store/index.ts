import { reactive, readonly, App, inject } from 'vue'
const StoreSymbol = Symbol('store')

export const useStore = (): Voodollz.AppStore => {
  return inject(StoreSymbol) as Voodollz.AppStore
}

export const createStore = () => {
  const state = reactive({})

  const store = {
    state: readonly(state),
  }

  const init = async () => {
  }

  const install = (app: App) => {
    app.provide(StoreSymbol, store)
  }

  return { install, store, init }
}
