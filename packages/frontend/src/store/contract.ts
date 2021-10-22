import Web3 from 'web3/dist/web3.min'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import { reactive, computed } from 'vue'
import { abi } from '../../../contract/build/contracts/Voodollz.json'

export let web3: Web3, contract: Contract

export const state = reactive({
  totalSupply: 0,
  price: 0,
  inWhitelist: false,
  presaled: false,
  paused: false,
  address: import.meta.env.VITE_CONTRACT_ADDRESS,
  active: true,
})

export const init = async () => {
  if (!window.ethereum) return

  try {
    web3 = new Web3(window.ethereum)
    contract = new web3.eth.Contract(
      abi as unknown as AbiItem,
      import.meta.env.VITE_CONTRACT_ADDRESS
    )
    state.totalSupply = await contract.methods
      .totalSupply()
      .call()
      .then(parseInt)
    state.presaled = await contract.methods.presaled().call()
    state.paused = await contract.methods.paused().call()
  } catch (e) {
    state.active = false
    console.error(e)
  }
}
