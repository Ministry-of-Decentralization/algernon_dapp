import config from '../config'
const ipfs = require('ipfs-http-client')

export default async () => {

  const ipfsClient = ipfs(config.ipfsEndpoint)

  const clientId = await ipfsClient.id()
  console.log(`initing ipfs client at ${config.ipfsEndpoint} -- client id ${clientId}`)


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


