import {
  createRouter as createVueRouter,
  createWebHistory,
  RouteRecordRaw,
} from 'vue-router'
import { guardPipeline } from './guard-pipeline'
import Home from '@/views/Home.vue'
import BaseLayout from '@/layouts/Base.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    component: BaseLayout,
    children: [
      {
        path: '',
        name: 'home',
        component: Home,
      },
    ],
  },
]

export const createRouter = (store: Voodollz.AppStore) => {
  const router = createVueRouter({
    history: createWebHistory(),
    linkExactActiveClass: 'active',
    routes,
  })

  router.beforeEach((to, from, next) =>
    guardPipeline({ to, from, next, store })()
  )

  return router
}
