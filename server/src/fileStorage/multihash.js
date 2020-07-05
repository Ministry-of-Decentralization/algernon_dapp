import bs58 from 'bs58';
import { web3 } from '../web3'
var multihash = require('multihashes')
//var multihash = require('multi-hash');

export const encodeString = str => {
  console.log('encoding ', str)
  const bufStr = Buffer.from(str, 'utf-8')
  const hex  = web3.utils.asciiToHex(str)
  const bytes32 = web3.utils.hexToBytes(hex)
  const ipfsHash = multihash.encode(bufStr);
  console.log('ipfshash ', ipfsHash)
  return getBytes32FromMultihash(ipfsHash)
}
/**
 * @typedef {Object} Multihash
 * @property {string} digest The digest output of hash function in hex with prepended '0x'
 * @property {number} hashFunction The hash function code for the function used
 * @property {number} size The length of digest
 */

/**
 * Partition multihash string into object representing multihash
 *
 * @param {string} multihash A base58 encoded multihash string
 * @returns {Multihash}
 */
export function getBytes32FromMultihash(multihash) {
  const decoded = bs58.decode(multihash);

  return {
    digest: `0x${decoded.slice(2).toString('hex')}`,
    hashFunction: decoded[0],
    size: decoded[1],
  };
}

/**
 * Encode a multihash structure into base58 encoded multihash string
 *
 * @param {Multihash} multihash
 * @returns {(string|null)} base58 encoded multihash string
 */
export function getMultihashFromBytes32(multihash) {
  const { digest, hashFunction, size } = multihash;
  if (size === 0) return null;

  // cut off leading "0x"
  const hashBytes = Buffer.from(digest.slice(2), 'hex');

  // prepend hashFunction and digest size
  const multihashBytes = new (hashBytes.constructor)(2 + hashBytes.length);
  multihashBytes[0] = hashFunction;
  multihashBytes[1] = size;
  multihashBytes.set(hashBytes, 2);

  return bs58.encode(multihashBytes);
}

/**
 * Parse Solidity response in array to a Multihash object
 *
 * @param {array} response Response array from Solidity
 * @returns {Multihash} multihash object
 */
export function parseContractResponse(response) {
  const digest = response[0];
  const hashFunction = response[1];
  const size = response[2];
  return {
    digest,
    hashFunction: hashFunction.toNumber ? hashFunction.toNumber() : parseInt(hashFunction, 10),
    size: size.toNumber? size.toNumber() : parseInt(size, 10),
  };
}

/**
 * Parse Solidity response in array to a base58 encoded multihash string
 *
 * @param {array} response Response array from Solidity
 * @returns {string} base58 encoded multihash string
 */
export function getMultihash(response) {
  return getMultihashFromBytes32(parseContractResponse(response));
}