import 'fileStorage'
import { trimHexLeadingZero } from 'web3x-es/utils'

const PRIVATE_KEY = "DA3EA9F46CA36308F053192EA3D549C9D011FBB4C0BB2200492348B7D942F0B0"
const PUBLIC_KEY = "0x663eA50cBA3520f081A98444bf65Acf2f59e2717"
console.log('in fs ', process.env)
const schainEndpoint = 'wss://sip2211-1.skalenodes.com:10217'
var encoder = new TextEncoder() // 'TextEncoder' in window ?
  //new TextEncoder() : {encode: (str: string): Uint8Array => Uint8Array.from(str, (c: string) => c.codePointAt(0))}

const storageInstance = FileStorage(schainEndpoint)
export default storageInstance

export const saveFile = (fileName: string, fileString: string) => {
  const bytes = encoder.encode(fileString)
  return storageInstance.uploadFile(
    PUBLIC_KEY,
    fileName, 
    bytes,
    PRIVATE_KEY
  )
  .catch((e: Error) => {
    console.log('error storing file ', e, e.message)
    if (e.message.includes('File or directory exists')) {
      const newFileName = fileName.split('_')
      const newIdx = parseInt(newFileName[1]) + 1
      return storageInstance.uploadFile(
        PUBLIC_KEY,
        `${newFileName[0]}_${newIdx}`, 
        bytes,
        PRIVATE_KEY
      )
      .catch((e: Error) => console.log('error storing file not duplicate', e.message))
    }
  })
}

export const getFiles = (address: string) => {
  return storageInstance.listDirectory(
    trimHexLeadingZero(address)
  )
}

export const getFile = async (link: string) => {
  console.log('getting file ', link)
  const file = await storageInstance.downloadToBuffer(link)
  console.log('got file ', file)
  const fileString = 'data:image/png;base64,' + file.toString('base64')
  return fileString
}

export const fileToAscii = (file: string) => 
  new Buffer(file.split('base64,')[1], 'base64')
    .toString('ascii');
