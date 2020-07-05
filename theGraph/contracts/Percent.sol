pragma solidity ^0.5.0;

import './SafeMath.sol';

/** @title Percent. */
contract Percent {
  using SafeMath for uint;

  function getPercent(uint _share, uint _total, uint _toSplit) internal pure returns(uint) {
    return _share.mul(_toSplit).div(_total);
  }

  function getPercentShare(uint _percent, uint _total, uint _precision) internal pure returns(uint) {
    return _total.mul(_percent).mul(_precision).div(_precision.mul(100));
  }

}
