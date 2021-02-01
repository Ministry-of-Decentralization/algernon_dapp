import Fortmatic from 'fortmatic'
import Web3 from 'web3'
import config from '../../config';
import base from './base'

export const getNewFortmaticInstance = () => {
  console.log(`conencting Fortmatic wallet ${process.env.FORTMATIC_API_KEY}`)
  const fortmatic = new Fortmatic(
    config.fortmaticApiKey,
    {
      rpcUrl: config.ethNodeEndpoint,
      chainId: config.chainId
    })
    const provider = fortmatic.getProvider();
    // @ts-ignore
    return [ new Web3(provider), provider];
}

  export default {
    ...base,
    connectWallet: getNewFortmaticInstance
  }
