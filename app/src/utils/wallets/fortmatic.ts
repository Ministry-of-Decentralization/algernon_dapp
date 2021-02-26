import Fortmatic from 'fortmatic'
import Web3 from 'web3'
import config from '../../config';
import base from './base'

export const getNewFortmaticInstance = () => {
  const fortmatic = new Fortmatic(
    config.fortmaticApiKey,
    {
      rpcUrl: config.chainEndpoint,
      chainId: config.chainId
    })
    const provider = fortmatic.getProvider();
    // @ts-ignore
    return [ new Web3(provider), provider];
}

const fortmatic = {
    ...base,
    connectWallet: getNewFortmaticInstance
  }

  export default fortmatic
