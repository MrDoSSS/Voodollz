import Web3 from 'web3'
import { AbiItem } from 'web3-utils'
import { abi as voodollzAbi } from '../../contract/build/contracts/Voodollz.json'
import { abi as cwAbi } from '../../contract/build/contracts/CommunityWallet.json'
import * as functions from 'firebase-functions'

const { voodollz } = functions.config()

const providerUrl = process.env.FUNCTIONS_EMULATOR
  ? 'ws://localhost:8545'
  : `wss://${voodollz.eth_network}.infura.io/ws/v3/${voodollz.infura_project_id}`

const provider = new Web3.providers.WebsocketProvider(providerUrl, {
  clientConfig: { keepalive: true, keepaliveInterval: -1 },
  reconnect: { auto: true, delay: 1000 },
})

export const web3 = new Web3(provider)

export let account = web3.eth.accounts.wallet.add({
  address: voodollz.owner_address,
  privateKey: voodollz.owner_pk,
})

export const voodollzContract = new web3.eth.Contract(
  voodollzAbi as unknown as AbiItem,
  voodollz.contract_address,
  {
    from: account.address,
  }
)

export const cwContract = new web3.eth.Contract(
  cwAbi as unknown as AbiItem,
  voodollz.cw_contract_address,
  {
    from: account.address,
  }
)
