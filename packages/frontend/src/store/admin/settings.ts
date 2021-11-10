import { reactive } from 'vue'
import { voodollz, web3 } from '@/store/contract'
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
  state.paused = await voodollz.methods.paused().call()
}

export const fetchPresaled = async () => {
  state.presaled = await voodollz.methods.presaled().call()
}

export const setPause = async (pause: boolean) => {
  const methodName = pause ? 'pause' : 'unpause'
  const method = voodollz.methods[methodName]()
  const gas = await estimateGas(method)

  return method.send({ gas, maxPriorityFeePerGas: null, maxFeePerGas: null })
}

export const setPresale = async (presale: boolean) => {
  const methodName = presale ? 'presale' : 'unpresale'
  const method = voodollz.methods[methodName]()
  const gas = await estimateGas(method)

  return method.send({ gas, maxPriorityFeePerGas: null, maxFeePerGas: null })
}

export const setDeposit = async (amount: string) => {
  const value = web3.utils.toWei(amount)
  const method = voodollz.methods.deposit()
  const gas = await estimateGas(method, 0, { value })

  return method.send({
    value,
    gas,
    maxPriorityFeePerGas: null,
    maxFeePerGas: null,
  })
}
