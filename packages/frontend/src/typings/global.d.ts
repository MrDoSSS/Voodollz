import { AbstractProvider } from 'web3-core'

interface EthereumProvider extends AbstractProvider {
  isConnected(): boolean
  on<T>(event: string, handler: (data: T) => void): void
  isMetaMask: boolean
  selectedAddress: string
}

declare module 'vue' {
  export interface GlobalComponents {
    RouterLink: typeof import('vue-router')['RouterLink']
    RouterView: typeof import('vue-router')['RouterView']
  }
}

export {}
