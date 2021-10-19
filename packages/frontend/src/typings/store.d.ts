import { createStore } from '@/store'
export type AppStore = ReturnType<typeof createStore>['store']
