import * as stat from './stat'
import { voodollz } from '@/store/contract'
import { estimateGas } from '@/utils'

export * as whitelist from './whitelist'
export * as giveaway from './giveaway'
export * as settings from './settings'
export { stat }

export const withdraw = async () => {
  const method = voodollz.methods.withdraw()
  const gas = await estimateGas(method)

  await voodollz.methods.withdraw().send({
    gas,
    maxPriorityFeePerGas: null,
    maxFeePerGas: null,
  })
  await stat.fetchBalance()
}
