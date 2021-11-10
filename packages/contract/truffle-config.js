require('dotenv').config();
const HDWalletProvider = require("@truffle/hdwallet-provider");
const Web3 = require("web3");
const web3 = new Web3();

module.exports = {
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*",
    },
    ropsten: {
      provider() {
        return new HDWalletProvider(
          {
            privateKeys: [process.env.PK],
            providerOrUrl: `wss://ropsten.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`
          }
        )
      },
      network_id: 3
    },
    rinkeby: {
      provider() {
        return new HDWalletProvider(
          {
            privateKeys: [process.env.PK],
            providerOrUrl: `wss://rinkeby.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`
          }
        )
      },
      network_id: 4
    },
    goerli: {
      provider() {
        return new HDWalletProvider(
          {
            privateKeys: [process.env.PK],
            providerOrUrl: `wss://goerli.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`
          }
        )
      },
      network_id: 5
    },
    mainnet: {
      provider() {
        return new HDWalletProvider(
          {
            privateKeys: [process.env.PK],
            providerOrUrl: `wss://mainnet.infura.io/ws/v3/${process.env.INFURA_PROJECT_ID}`
          }
        )
      },
      network_id: 1,
      gas: 5369683,
      gasPrice: web3.utils.toWei('80', 'gwei')
    }
  },
  compilers: {
    solc: {
      version: "0.8.9",
    }
  },
  mocha: {
    reporter: 'eth-gas-reporter',
    reporterOptions: {
      coinmarketcap: '06910db7-0dbe-44ef-87f6-04936de1595f',
      currency: 'USD'
    }
  },
  plugins: ['truffle-plugin-verify'],
  api_keys: {
    etherscan: process.env.ETHERSCAN_API_KEY
  }
};
