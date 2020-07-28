import { Eth } from 'web3x-es/eth'
import { WebsocketProvider, HttpProvider } from 'web3x-es/providers';
import Fortmatic from 'fortmatic'
import Web3 from 'web3'
import { Algernon } from '../generated/Algernon';
import { AlgerToken } from '../generated/AlgerToken';
import { ethers } from 'ethers';
import initIpfs from '../fileStorage/ipfs'

declare const window : any

// "https://dev-testnet-v1-0.skalelabs.com"

const AlgerTokenArtifact = require("../contracts/AlgerToken.json")
const AlgernonArtifact = require("../contracts/Algernon.json")

const chainEndpoint = process.env.REACT_APP_LOCAL_CHAIN_ENDPOINT

const ipfsEndpoint = process.env.IPFS_ENDPOINT

const networkId = '1587695479278'
console.log(process.env)

const getLatestDeployment = (deployments: any) => {
  const key = Object.keys(deployments).sort((a, b) => parseInt(a) - parseInt(b)).pop()
  return deployments[key!]
}


// const wsProvider = new WebsocketProvider(schainEndpoint);


export const fm = new Fortmatic(process.env.REACT_APP_FORTMATIC_API_KEY!, {rpcUrl: chainEndpoint!, chainId: 1337});

const httppProvider = new HttpProvider(chainEndpoint!)

const web3Eth = new Eth(httppProvider)

export const ipfs = initIpfs(ipfsEndpoint)


const getWeb3 = () => {
  if (window.ethereum) {
    // @ts-ignore
    const web3 = new Web3(fm.getProvider())//window.ethereum)
    console.log(`returning web3 from window.ethereum ${JSON.stringify(web3.currentProvider, null, 2)}`)
    return web3
    try {
      // Request account access if needed
      window.ethereum.enable();
      // Acccounts now exposed
      return web3;
    } catch (error) {
      console.error(error);
    }
  }
  // Legacy dapp browsers...
  else if (window.web3) {
    // Use Mist/MetaMask's provider.
    const web3 = window.web3;
    console.log('Injected web3 detected.');
    return web3;
  }
  // Fallback to localhost; use dev console port by default...
  else {
    const provider = new Web3.providers.HttpProvider('http://167.172.118.124:10003');
    const web3 = new Web3(provider);
    console.log('No web3 instance injected, using Local web3.');
    return web3;
  }
}


export const windowWeb3 = window.web3
export const web3 = getWeb3()

const getChainId = async () => {
  const id = await web3.eth.getChainId()
  console.log(`chain id ${id}`)
}

getChainId()

export const ethersProvider = new ethers.providers.JsonRpcProvider(chainEndpoint!)

const getChainCode = async () => {
  try {
    const code = await ethersProvider.getCode(chainEndpoint!)
    console.log('got code ethers ', code)
  } catch (e) {
    console.log('error getting ethers code ', e)
  }

  try {
    const code = await web3Eth.getCode(AlgerTokenArtifact.networks[networkId].address)
    console.log('got code web3 ', code)
  } catch (e) {
    console.log('error getting web3 code')
  }

}

// getChainCode()

const algernonAddress = getLatestDeployment(AlgernonArtifact.networks).address//[networkId].address;

const getDeployedContract = (abi: any, address: string) => {
  const web3 = getWeb3()
  const contract =  new web3.eth.Contract(abi, address)
  return contract
}

export const algernonContract = getDeployedContract(AlgernonArtifact.abi, algernonAddress)


export const ethersAlgernon = new ethers.Contract(
  AlgernonArtifact.networks[networkId].address,
  AlgernonArtifact.abi,
  ethersProvider
  ) 

const algerTokenAddress = AlgerTokenArtifact.networks[networkId].address;

export const algerTokenContract = new AlgerToken(
  web3, 
  algerTokenAddress
)
