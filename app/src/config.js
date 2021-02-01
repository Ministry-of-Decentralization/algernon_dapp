import env from "react-dotenv";

console.log('envs ', env, window.env)

const envVars = {
  ethNodeEndpoint: env.CHAIN_ENDPOINT,
  fortmaticApiKey: env.FORTMATIC_API_KEY
}

const CHAINS = {
  DEV: {
    ...envVars,
    chainId: 1337,
    algernonAddress: '0x26950f5d5B2eA2AC11d8A2cB67a62D8831Be3d8F',
    theGraphEndpoint: 'http://127.0.0.1:8000/subgraphs/name/cirsteve/algernon',
    ipfsEndpoint: '/ip4/127.0.0.1/tcp/4001'//    '/ip4/0.0.0.0/tcp/5001'
  },
  KOVAN: {
    ...envVars,
    chainId: 42,
    algernonAddress: '0x1acE7049142881d42Fe104B212C8E7a457eE0C91',
    theGraphEndpoint: 'https://api.thegraph.com/subgraphs/name/ministry-of-decentralization/algernon-kovan',
    ipfsEndpoint: 'https://ipfs.algernon.io/api/'
  }
}

const getChainConfig = (chain) => CHAINS[chain]


export default getChainConfig(env.ALGERNON_ENV)
