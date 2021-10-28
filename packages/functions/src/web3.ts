import Web3 from 'web3'
import { Account } from 'web3-core'
import { AbiItem } from 'web3-utils'
import { abi as voodollzAbi } from '../../contract/build/contracts/Voodollz.json'
import { abi as cwAbi } from '../../contract/build/contracts/CommunityWallet.json'
import { mnemonicToSeed } from 'bip39'
import { hdkey } from 'ethereumjs-wallet'
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

export const voodollzContract = new web3.eth.Contract(
  voodollzAbi as unknown as AbiItem,
  voodollz.contract_address
)

export const cwContract = new web3.eth.Contract(
  cwAbi as unknown as AbiItem,
  voodollz.cw_contract_address
)

export let account: Account

export const initAccountOwner = async () => {
  const seed = await mnemonicToSeed(voodollz.mnemonic as string)
  const hdk = hdkey.fromMasterSeed(seed)

  const addressNode = hdk.derivePath("m/44'/60'/0'/0/0")
  const address = addressNode.getWallet().getAddressString()
  const privateKey = addressNode.getWallet().getPrivateKeyString()

  account = web3.eth.accounts.wallet.add({ address, privateKey })
  voodollzContract.options.from = account.address
  cwContract.options.from = account.address
}
