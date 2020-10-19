require('dotenv').config()
const path = require("path");
const HDWalletProvider = require("truffle-hdwallet-provider");

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "build"),
  networks: {
    development: {
      host: "0.0.0.0",
      port: 8545,
      network_id: "*" // Match any network id
    },
    skale: {
      provider: () => new HDWalletProvider(process.env.SKALE_PRIVATE_KEY, process.env.SKALE_ENDPOINT),
      gasPrice: 0,
      network_id: process.env.SKALE_NETWORK_ID
    },
    rinkeby: {
      provider: () => new HDWalletProvider(process.env.PRIVATE_KEY, process.env.RINKEBY_ENDPONIT),
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
    }
  },
  compilers: {
    solc: {
      version: "0.6.2"
    }
  }
};
