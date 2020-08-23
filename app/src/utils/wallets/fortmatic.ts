import Fortmatic from 'fortmatic'
import { CHAIN_ENDPOINT } from '../../config';

export const getNewFortmaticInstance = () => new Fortmatic(
  process.env.REACT_APP_FORTMATIC_API_KEY!,
  {
    rpcUrl: CHAIN_ENDPOINT!,
    chainId: 1337
  });

  export default {
    connectWallet: getNewFortmaticInstance
  }
