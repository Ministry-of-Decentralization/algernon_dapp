const ipfs = require('ipfs-http-client')

const initIpfs = (ipfsEndpoint) => {
  const getClient = (endpoint) => ipfs(endpoint)

  const ipfsClient = getClient(ipfsEndpoint)

  const addFile = async (fileData) => {
    const saved = await ipfsClient.add(new Buffer.from(fileData, 'utf-8'), {pin: true})
    return saved[0].hash
  }

  const getFile = async (hash) => {
    const contents = await ipfsClient.get(`/ipfs/${hash}`)
    return contents[0].content.toString()

  }

  return {
    addFile,
    getFile
  }
}

module.exports = initIpfs


