import web3 from 'web3'
import config from "../config"
const AlgernonArtifact = require("../abis/Algernon.json")

const getDeployedContract = (web3: any, abi: any, address: string) => {
  const contract =  new web3.eth.Contract(abi, address)
  return contract
}

export const getAlgernonInstance = (web3: any) => getDeployedContract(web3, AlgernonArtifact.abi, config.algernonAddress)

export const convertToChecksum = (address: string) => web3.utils.toChecksumAddress(address)


