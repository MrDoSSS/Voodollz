import { reactive } from 'vue'
import { contract, web3 } from '@/store/contract'

export const state = reactive({
  balance: 0,
  totalSupply: 0,
})

export const fetchBalance = async () => {
  try {
    const balance = await web3.eth.getBalance(contract.options.address)
    state.balance = parseFloat(web3.utils.fromWei(balance))
  } catch (e) {
    console.error('fetchBalance', e)
  }
}

export const fetchTotalSupply = async () => {
  try {
    state.totalSupply = await contract.methods.totalSupply().call()
  } catch (e) {
    console.error('fetchTotalSupply', e)
  }
}

export const fetchAll = async () => {
  await fetchBalance()
  await fetchTotalSupply()
}
