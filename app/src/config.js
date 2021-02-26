export const CHAIN_IDS = {
  1337: 'Ganache Local',
  42: 'Kovan'
}

const ENVS = {
  DEV: {
    chainId: 1337,
    networkName: 'Ganache Local',
    chainEndpoint: process.env.REACT_APP_LOCAL_CHAIN_ENDPOINT,
    algernonAddress: '0x26950f5d5B2eA2AC11d8A2cB67a62D8831Be3d8F',
    theGraphEndpoint: process.env.REACT_APP_LOCAL_SUBGRAPH_ENDPOINT,
    ipfsEndpoint: process.env.REACT_APP_LOCAL_IPFS_ENDPOINT,
    fortmaticApiKey: process.env.REACT_APP_FORTMATIC_API_TEST_KEY
  },
  KOVAN: {
    chainId: 42,
    networkName: 'Kovan',
    chainEndpint: process.env.REACT_APP_LOCAL_CHAIN_ENDPOINT,
    algernonAddress: '0x1acE7049142881d42Fe104B212C8E7a457eE0C91',
    theGraphEndpoint: process.env.REACT_APP_LOCAL_SUBGRAPH_ENDPOINT,
    ipfsEndpoint: process.env.REACT_APP_KOVAN_IPFS_ENDPOINT,
    fortmaticApiKey: process.env.REACT_APP_FORTMATIC_API_LIVE_KEY
  }
}

export default ENVS[process.env.REACT_APP_ALGERNON_ENV]