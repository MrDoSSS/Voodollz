import Web3 from 'web3/dist/web3.min'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import { reactive, computed } from 'vue'
import { abi } from '../../../contract/build/contracts/Voodollz.json'
import { estimateGas, getMintedTokenIds } from '@/utils'

export let web3: Web3, contract: Contract

export const state = reactive({
  totalSupply: 0,
  price: 0,
  maxTokenCount: 10000,
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
    state.price = await contract.methods.PRICE().call()
    state.maxTokenCount = await contract.methods.MAX_TOKEN_COUNT().call()
  } catch (e) {
    state.active = false
    console.error(e)
  }
}

export const priceInEth = computed(() =>
  parseFloat(web3.utils.fromWei(state.price.toString(), 'ether'))
)

export const voodollzLeft = computed(
  () => state.maxTokenCount - state.totalSupply
)

export const mint = async (amount: number) => {
  try {
    const method = contract.methods.mint(amount)
    const value = state.price * amount
    const gas = await estimateGas(method, 200000 * amount, { value })

    const res = await method.send({
      gas,
      value,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null,
    })

    state.totalSupply = await contract.methods.totalSupply().call()

    return getMintedTokenIds(res.events.Transfer)
  } catch (e) {
    console.error('mint error', e)
    throw e
  }
}

export const presaleMint = async (amount: number, signature: string) => {
  try {
    const method = contract.methods.presaleMint(amount, signature)
    const value = state.price * amount
    const gas = await estimateGas(method, 200000 * amount, { value })

    const res = await method.send({
      gas,
      value,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null,
    })

    state.totalSupply = await contract.methods.totalSupply().call()

    return getMintedTokenIds(res.events.Transfer)
  } catch (e) {
    console.error('presale error', e)
    throw e
  }
}
