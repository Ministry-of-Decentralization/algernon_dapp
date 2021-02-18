const ipfsClient = require('ipfs-http-client')

const addFile = async (ipfs, file) => {
  const saved = await ipfs.add(file)
  return JSON.stringify({ hash: saved.path });
}

const getFile = async (ipfs, url) => {
  const file = await ipfs.get(url)
  return JSON.stringify({ file });
}

const getCorsHeaders = () => ({
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Credentials': true,
})

module.exports.ipfsAdd = async (event, ass) => {
  const headers = getCorsHeaders()
  // different event schema when running via serverless-offline
  const input = event.input || JSON.parse(event.body).input

  try {
    const ipfs = ipfsClient(process.env.IPFS_ENDPOINT)
    const body = await addFile(ipfs, new Buffer.from(input, 'utf-8'))
    return {
      headers,
      statusCode: 200,
      body
    };
  } catch (e) {
    return {
      headers,
      statusCode: 500,
      body: e.message
    };
  }
};

module.exports.ipfsGet = async (event) => {
  const headers = getCorsHeaders()
  try {
    const ipfs = ipfsClient(process.env.IPFS_ENDPOINT)
    const body = await getFile(ipfs, event.input)

    return {
      headers,
      statusCode: 200,
      body
    };
  } catch (e) {
    return {
      headers,
      statusCode: 500,
      body: e.message
    };
  }
};