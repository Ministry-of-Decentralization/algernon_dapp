import config from '../config'
const axios = require('axios').default;

const Ipfs = () => {

  const saveFile = async (fileData) => {
    const addEndpoint = '/ipfsAdd'  
    const body = {
      input: fileData
    }
    const response = await axios.post(`${config.ipfsEndpoint}${addEndpoint}`, body)
    console.log(`saved file response${JSON.stringify(response)}`)

    return response.data.hash
  }

  const getFile = async (url) => {
    const getEndpoint = '/ipfsGet'  
    const body = {
      input: url
    }
    const response = await axios.post(`${config.ipfsEndpoint}${getEndpoint}`, body)
    return response.data
  }

  return {
    saveFile,
    getFile
  }
}

export default Ipfs
