import Web3 from 'web3'
import { Account } from 'web3-core'
import { AbiItem } from 'web3-utils'
import { abi } from '../../contract/build/contracts/Voodollz.json'
import { mnemonicToSeed } from 'bip39'
import { hdkey } from 'ethereumjs-wallet'
import * as functions from 'firebase-functions'

const { INFURA_PROJECT_ID, CONTRACT_ADDRESS, MNEMONIC } = functions.config()

const providerUrl = process.env.FUNCTIONS_EMULATOR
  ? 'ws://localhost:8545'
  : `wss://${process.env.ETH_NETWORK}.infura.io/ws/v3/${INFURA_PROJECT_ID}`

const provider = new Web3.providers.WebsocketProvider(providerUrl)

export const web3 = new Web3(provider)

export const contract = new web3.eth.Contract(
  abi as unknown as AbiItem,
  CONTRACT_ADDRESS
)

export let account: Account

export const initAccountOwner = async () => {
  const seed = await mnemonicToSeed(MNEMONIC as string)
  const hdk = hdkey.fromMasterSeed(seed)

  const addressNode = hdk.derivePath("m/44'/60'/0'/0/0")
  const address = addressNode.getWallet().getAddressString()
  const privateKey = addressNode.getWallet().getPrivateKeyString()

  account = web3.eth.accounts.wallet.add({ address, privateKey })
  contract.options.from = account.address
}
