pragma solidity ^0.5.0;

import './ERC20.sol';
contract AlgerToken is ERC20Capped {
  string public name = "AlgerToken";
  string public symbol = "ALG";
  uint public decimals = 8;

  constructor(uint _cap) ERC20Capped(_cap) public {}

}
