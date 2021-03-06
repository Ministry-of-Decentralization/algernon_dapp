pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC777/ERC777.sol";


/**
 * @title AlgerToken
 * Based on https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/examples/SimpleToken.sol
 */
contract AlgerToken is ERC777 {

    constructor () ERC777("AlgerToken", "ALG", new address[](0)) {
        _mint(msg.sender, 21000000 * 10 ** 18, "", "");
    }
}
