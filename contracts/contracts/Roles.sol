// contracts/Roles.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;

import "openzeppelin-solidity/contracts/access/AccessControl.sol";

contract Roles is AccessControl {
    bytes32 public constant TAGGER_ROLE = keccak256("TAGGER_ROLE");

    constructor() public {
        // Grant the contract deployer the default admin role: it will be able
        // to grant and revoke any roles
        _setupRole(DEFAULT_ADMIN_ROLE, msg.sender);
        grantRole(TAGGER_ROLE, msg.sender);
    }

    function isAdmin(address _addr) public view returns (bool) {
        return hasRole(DEFAULT_ADMIN_ROLE, _addr);
    }

      function isTagger(address _addr) public view returns (bool) {
        return hasRole(TAGGER_ROLE, _addr);
    }
}