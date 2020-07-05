const initIpfs = require('./ipfs')
const { IPFS_ENDPOINT } = require('../config')

const ipfsClient = initIpfs(IPFS_ENDPOINT)

module.exports = ipfsClient 