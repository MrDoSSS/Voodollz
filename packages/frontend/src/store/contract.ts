import Web3 from 'web3/dist/web3.min'
import { Contract } from 'web3-eth-contract'
import { AbiItem } from 'web3-utils'
import { reactive, computed } from 'vue'
import { abi as voodollzAbi } from '../../../contract/build/contracts/Voodollz.json'
import { abi as cwAbi } from '../../../contract/build/contracts/CommunityWallet.json'
import { estimateGas, getMintedTokenIds } from '@/utils'
import { getDataForClaim } from '@/firebase/functions'

export let web3: Web3, voodollz: Contract, cw: Contract

export const state = reactive({
  totalSupply: 0,
  price: 0,
  maxTokenCount: 10000,
  inWhitelist: false,
  presaled: false,
  paused: false,
  address: import.meta.env.VITE_VOODOLLZ_CONTRACT_ADDRESS,
  active: true,
})

export const init = async () => {
  if (!window.ethereum) return

  try {
    web3 = new Web3(window.ethereum)
    voodollz = new web3.eth.Contract(
      voodollzAbi as unknown as AbiItem,
      import.meta.env.VITE_VOODOLLZ_CONTRACT_ADDRESS
    )
    cw = new web3.eth.Contract(
      cwAbi as unknown as AbiItem,
      import.meta.env.VITE_CW_CONTRACT_ADDRESS
    )
    state.totalSupply = await voodollz.methods
      .totalSupply()
      .call()
      .then(parseInt)
    state.presaled = await voodollz.methods.presaled().call()
    state.paused = await voodollz.methods.paused().call()
    state.price = await voodollz.methods.PRICE().call()
    state.maxTokenCount = await voodollz.methods.MAX_TOKEN_COUNT().call()
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
    const method = voodollz.methods.mint(amount)
    const value = state.price * amount
    const gas = await estimateGas(method, 200000 * amount, { value })

    const res = await method.send({
      gas,
      value,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null,
    })

    state.totalSupply = await voodollz.methods.totalSupply().call()

    return getMintedTokenIds(res.events.Transfer)
  } catch (e) {
    console.error('mint error', e)
    throw e
  }
}

export const presaleMint = async (amount: number, signature: string) => {
  try {
    const method = voodollz.methods.presaleMint(amount, signature)
    const value = (state.price / 2) * amount
    const gas = await estimateGas(method, 200000 * amount, { value })

    const res = await method.send({
      gas,
      value,
      maxPriorityFeePerGas: null,
      maxFeePerGas: null,
    })

    state.totalSupply = await voodollz.methods.totalSupply().call()

    return getMintedTokenIds(res.events.Transfer)
  } catch (e) {
    console.error('presale error', e)
    throw e
  }
}

export const claim = async () => {
  const { data } = await getDataForClaim()
  const method = cw.methods.claim(data.amount, data.nonce, data.signature)
  const gas = await estimateGas(method, 0)
  await method.send({ gas })
}
