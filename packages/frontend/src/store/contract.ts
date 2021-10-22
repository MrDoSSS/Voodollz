import Web3 from 'web3/dist/web3.min'
import { Contract } from 'web3-eth-contract'
import { reactive, computed } from 'vue'
import { abi } from '../../../contract/build/contracts/Voodollz.json'

export let web3: Web3, contract: Contract

export const state = reactive({
  totalSupply: 0,
  price: 0,
  inWhitelist: false,
  presale: false,
  paused: false,
  address: import.meta.env.VITE_CONTRACT_ADDRESS,
  active: true,
})

export const init = async () => {
  if (!window.ethereum) return

  web3 = new Web3(window.ethereum)
  contract = new web3.eth.Contract(
    abi as unknown as AbiItem,
    import.meta.env.VITE_CONTRACT_ADDRESS
  )
}
