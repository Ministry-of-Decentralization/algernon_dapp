  const ipfs = require('ipfs-http-client')

export default (ipfsEndpoint) => {
  const getClient = (endpoint) => ipfs(endpoint)

  const ipfsClient = getClient(ipfsEndpoint)

  const saveFile = async (fileData) => {
    const savedFile = ipfsClient.add(Buffer.from(fileData, 'utf-8'), {pin: true, 'no-cors': true}, (boo) => console.log('boo is ', boo))
    for await (const d of savedFile) {
      console.log('saved file is ', d)
    }
    return savedFile
  }

  const getFile = (url) => ipfsClient.get(url)

  return {
    saveFile,
    getFile
  }
}


