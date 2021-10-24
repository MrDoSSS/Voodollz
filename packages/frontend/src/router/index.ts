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
  {
    path: '/',
    component: () => import('@/layouts/Empty.vue'),
    children: [
      {
        path: '/admin/login',
        name: 'admin-login',
        component: () => import('@/views/admin/Login.vue'),
      },
    ],
  },
  {
    path: '/admin',
    component: () => import('@/layouts/Admin.vue'),
    children: [
      {
        name: 'admin-index',
        path: '',
        component: () => import('@/views/admin/Index.vue'),
      },
      {
        name: 'admin-whitelist-index',
        path: 'whitelist',
        component: () => import('@/views/admin/Whitelist.vue'),
      },
      {
        name: 'admin-giveaway-index',
        path: 'giveaway',
        component: () => import('@/views/admin/Giveaway.vue'),
      },
      {
        name: 'admin-settings-index',
        path: 'settings',
        component: () => import('@/views/admin/Settings.vue'),
      },
    ],
    meta: {
      guard: ['admin'],
    },
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
