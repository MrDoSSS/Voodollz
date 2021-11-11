/// <reference types="vite/client" />

declare module '*.vue' {
  import { DefineComponent } from 'vue'
  // eslint-disable-next-line @typescript-eslint/no-explicit-any, @typescript-eslint/ban-types
  const component: DefineComponent<{}, {}, any>
  export default component
}

declare module 'web3/dist/web3.min' {
  import * as Web3 from 'web3'
  export = Web3
}

interface ImportMetaEnv {
  VITE_VOODOLLZ_CONTRACT_ADDRESS: string
  VITE_CW_CONTRACT_ADDRESS: string
  VITE_INFURA_PROJECT_ID: string
}
