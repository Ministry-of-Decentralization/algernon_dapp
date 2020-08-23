import Web3 from 'web3'

const connectMetamask = () => {
  // @ts-ignore
  if (window.ethereum) {
    // @ts-ignore
    window.web3 = new Web3(window.ethereum);
    // @ts-ignore
    window.ethereum.enable();
    return true;
  }
  return false;
}

export default {
  connectWallet: connectMetamask
}