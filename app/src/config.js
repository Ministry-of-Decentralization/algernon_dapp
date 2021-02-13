export const CHAIN_IDS = {
  1337: 'Ganache Local',
  42: 'Kovan'
}

const ENVS = {
  DEV: {
    chainId: 1337,
    networkName: 'Ganache Local',
    chainEndpoint: 'http://localhost:8545',
    algernonAddress: '0x26950f5d5B2eA2AC11d8A2cB67a62D8831Be3d8F',
    theGraphEndpoint: 'http://127.0.0.1:8000/subgraphs/name/cirsteve/algernon',
    ipfsEndpoint: '/ip4/0.0.0.0/tcp/5001',
    fortmaticApiKey: process.env.REACT_APP_FORTMATIC_API_TEST_KEY
  },
  KOVAN: {
    chainId: 42,
    networkName: 'Kovan',
    chainEndpint: 'https://kovan.infura.io/v3/52c9ebfa30ed43fd88c2392826f8c3ad',
    algernonAddress: '0x1acE7049142881d42Fe104B212C8E7a457eE0C91',
    theGraphEndpoint: 'https://api.thegraph.com/subgraphs/name/ministry-of-decentralization/algernon-kovan',
    ipfsEndpoint: 'https://ipfs.algernon.io/api/',
    fortmaticApiKey: process.env.REACT_APP_FORTMATIC_API_LIVE_KEY
  }
}

export default ENVS[process.env.REACT_APP_ALGERNON_ENV]