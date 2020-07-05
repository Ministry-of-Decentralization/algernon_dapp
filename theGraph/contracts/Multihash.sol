pragma solidity ^0.5.0;

/** @title MultiHash. */
contract Multihash {

  struct MultiHash {
    bytes32 hash;
    uint8 hashFunction;
    uint8 size;
  }

  function createMultiHash(bytes32 _hash, uint8 _hashFunction, uint8 _size) internal pure returns (MultiHash memory) {
      return MultiHash(_hash, _hashFunction, _size);
  }
}
