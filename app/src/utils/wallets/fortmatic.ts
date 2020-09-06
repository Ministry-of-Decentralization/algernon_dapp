import Fortmatic from 'fortmatic'
import Web3 from 'web3'
import { CHAIN_ENDPOINT } from '../../config';
import base from './base'

export const getNewFortmaticInstance = () => {
  console.log(`conencting Fortmatic wallet ${process.env.REACT_APP_FORTMATIC_API_KEY}`)
  const fortmatic = new Fortmatic(
    process.env.REACT_APP_FORTMATIC_API_KEY!,
    {
      rpcUrl: CHAIN_ENDPOINT!,
      chainId: 1337
    })
    const provider = fortmatic.getProvider();
    // @ts-ignore
    return [ new Web3(provider), provider];
}

  export default {
    ...base,
    connectWallet: getNewFortmaticInstance
  }
