const AlgernonArtifact = require("../abis/Algernon.json")

const getLatestDeployment = (deployments: any) => {
  const key = Object.keys(deployments).sort((a, b) => parseInt(a) - parseInt(b)).pop()
  return deployments[key!]
}

const algernonAddress = '0x26950f5d5B2eA2AC11d8A2cB67a62D8831Be3d8F'//getLatestDeployment(AlgernonArtifact.networks).address//[networkId].address;

const getDeployedContract = (web3: any, abi: any, address: string) => {
  const contract =  new web3.eth.Contract(abi, address)
  return contract
}

// export const algernonContract = getDeployedContract(null, AlgernonArtifact.abi, algernonAddress)

export const getAlgernonInstance = (web3: any) => getDeployedContract(web3, AlgernonArtifact.abi, algernonAddress)


