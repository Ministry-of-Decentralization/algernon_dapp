pragma solidity ^0.8.0;

/** @title Percent. */
contract Percent {

  function getPercent(uint _share, uint _total, uint _toSplit) internal pure returns(uint) {
  return _share * _toSplit / _total;
  }

  function getPercentShare(uint _percent, uint _total, uint _precision) internal pure returns(uint) {
  return _total * _percent * _precision / (_precision * 100);
  }

}
