const ipfs = require('ipfs-http-client')

export default async (ipfsEndpoint) => {
  console.log(`getting ipfs client`)
  ipfsEndpoint = "/ip4/0.0.0.0/tcp/5001" || ipfsEndpoint || process.env.IPFS_ENDPOINT || "/ip4/0.0.0.0/tcp/5001"

  const ipfsClient = ipfs(ipfsEndpoint)
  const clientId = await ipfsClient.id()
  console.log(`initing ipfs client at ${ipfsEndpoint} -- client id ${clientId}`)


  const saveFile = async (fileData) => {
    console.log(`saving file ${fileData}`)
    const savedFile = await ipfsClient.add(fileData)
    console.log('saved file is ', savedFile)
  
    return savedFile.cid.toString()
  }

  const getFile = (url) => ipfsClient.get(url)

  return {
    saveFile,
    getFile
  }
}


