pragma solidity ^0.5.0;

contract ChildAccounts {

  mapping (address => address) public childAccounts;

  event ChildAccountUpdated(address parent, address child);

  function updateChildAccount(address childAddress) public returns (bool) {
    childAccounts[msg.sender] = childAddress;
    emit ChildAccountUpdated(msg.sender, childAddress);
    return true;
  }

  modifier isApprovedSender (address toUpdate) {
    require(msg.sender == toUpdate || isChildAccount(toUpdate, msg.sender), 'Transaction sender is not approved');
    _;
  }

  function isChildAccount(address parent, address child) public view returns (bool) {
    return childAccounts[parent] == child;
  }
}