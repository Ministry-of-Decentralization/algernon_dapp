pragma solidity ^0.6.2;

import "openzeppelin-solidity/contracts/token/ERC777/ERC777.sol";


/**
 * @title AlgerToken
 * Based on https://github.com/OpenZeppelin/openzeppelin-contracts/blob/master/contracts/examples/SimpleToken.sol
 */
contract AlgerToken is ERC777 {

    constructor () public ERC777("AlgerToken", "ALG", new address[](0)) {
        _mint(msg.sender, 21000000 * 10 ** 18, "", "");
    }
}
