require('dotenv').config()
const path = require("path");
const HDWalletProvider = require("@truffle/hdwallet-provider");

const kovanWalletArgs = {
  privateKeys: [process.env.PRIVATE_KEY],
  providerOrUrl: process.env.KOVAN_ENDPOINT
}

const skaleWalletArgs = {
  privateKeys: [process.env.SKALE_PRIVATE_KEY],
  providerOrUrl: process.env.SKALE_ENDPOINT
}

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "app/src/contracts"),
  networks: {
    development: {
      host: "0.0.0.0",
      port: 8545,
      network_id: "*" // Match any network id
    },
    skale: {
      provider: () => new HDWalletProvider(skaleWalletArgs),
      gasPrice: 0,
      network_id: process.env.SKALE_NETWORK_ID
    },
    kovan: {
      provider: () => new HDWalletProvider(kovanWalletArgs),
      network_id: 42,
      gas: 12400000 // Gas limit used for deploys
    }
  },
  compilers: {
    solc: {
      version: "0.6.2"
    }
  }
};
