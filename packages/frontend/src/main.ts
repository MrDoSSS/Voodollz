import { createApp } from 'vue'
import { createRouter } from './router'
import { createStore } from './store'

import App from './App.vue'

import './assets/index.scss'

const store = createStore()

store.init().finally(() => {
  const router = createRouter(store.store)

  const app = createApp(App).use(store).use(router)

  router.isReady().then(() => {
    app.mount('#app')
  })
})
