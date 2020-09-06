import Web3 from 'web3'
import base from './base'

const connectMetamask = async () => {
  console.log(`conencting MetaMask wallet`)
  // @ts-ignore
  if (window.ethereum) {
    // @ts-ignore
    window.web3 = new Web3(window.ethereum);
    // @ts-ignore
    await window.ethereum.enable();
    // @ts-ignore
    return [ window.web3, window.web3.currentProvider ];
  }
  return false;
}

export default {
  ...base,
  connectWallet: connectMetamask
}