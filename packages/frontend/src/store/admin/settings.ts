import { reactive } from 'vue'
import { contract } from '@/store/contract'
import { estimateGas } from '@/utils'

export const state = reactive({
  paused: false,
  presaled: false,
})

export const fetchAll = async () => {
  await fetchPaused()
  await fetchPresaled()
}

export const fetchPaused = async () => {
  state.paused = await contract.methods.paused().call()
}

export const fetchPresaled = async () => {
  state.presaled = await contract.methods.presaled().call()
}

export const setPause = async (pause: boolean) => {
  const methodName = pause ? 'pause' : 'unpause'
  const method = contract.methods[methodName]()
  const gas = await estimateGas(method)

  return method.send({ gas, maxPriorityFeePerGas: null, maxFeePerGas: null })
}

export const setPresale = async (presale: boolean) => {
  const methodName = presale ? 'presale' : 'unpresale'
  const method = contract.methods[methodName]()
  const gas = await estimateGas(method)

  return method.send({ gas, maxPriorityFeePerGas: null, maxFeePerGas: null })
}
