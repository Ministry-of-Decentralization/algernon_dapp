pragma solidity ^0.8.0;

import "openzeppelin-solidity/contracts/token/ERC777/IERC777Recipient.sol";
import './Staking.sol';
import "./ERC1820Client.sol";

contract Algernon is IERC777Recipient, Staking, ERC1820Client {
  address owner;
  IERC777  private _token;

  event TokensReceived(address operator, address from, address to, uint256 amount, bytes userData, bytes operatorData);
  event TokensSent(address operator, address from, address to, uint256 amount, bytes userData, bytes operatorData);

  constructor (address _tokenAddress) {
    owner = msg.sender;
    _token = IERC777(_tokenAddress);
    setInterfaceImplementation("ERC777TokensRecipient", address(this));

  }

  function createTopic(uint256[] memory _tagIds, string memory fileName) public returns (uint) {
    uint topicId = createUserTopic(fileName, _tagIds, msg.sender);

    return topicId;
  }

  function getContractTokenBalance() public view returns (uint256) {
    return IERC777(TOKEN_ADDRESS).balanceOf(address(this));
  }

  function getAlgernonTokenBalance(address _account) public view returns (uint) {
    return tokenBalances[_account];
  }

  function withdrawTokens(uint _amt) public {
    require(tokenBalances[msg.sender] >= _amt, 'Insufficient token balance');
    tokenBalances[msg.sender] -= _amt;
    IERC777(TOKEN_ADDRESS).send(msg.sender, _amt, "");
  }

  function tokensReceived(
    address operator,
    address from,
    address to,
    uint256 amount,
    bytes calldata userData,
    bytes calldata operatorData
  ) external override {
    require(msg.sender == address(_token), "Simple777Recipient: Invalid token");

    tokenBalances[from] += amount;

    emit TokensReceived(operator, from, to, amount, userData, operatorData);
  }
 }
