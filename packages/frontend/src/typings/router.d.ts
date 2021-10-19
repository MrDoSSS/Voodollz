import { RouteLocationNormalized } from 'vue-router'
import { AppStore } from './store'

export enum guards {
  Admin = 'admin',
}

export interface NextParams {
  stopPipeline?: boolean
  name?: string
  query?: {
    [key: string]: any
  }
}

export type Next = (to?: NextParams) => void

export type Context = {
  to: RouteLocationNormalized
  from: RouteLocationNormalized
  next: Next
  store: AppStore
}

export type Guard = (context: Context) => void

export interface GuardPipeline {
  (context: Context, middleware?: guards[], index?: number): (
    params?: NextParams
  ) => void
}
