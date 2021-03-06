pragma solidity ^0.8.0;

import './Topics.sol';
import './Percent.sol';
import "openzeppelin-solidity/contracts/token/ERC777/IERC777.sol";

contract Staking is Topics, Percent {

  address TOKEN_ADDRESS;
  address COMMUNITY_ADDRESS;
  uint constant DAILY_SECONDS = 86400;

  uint PRECISION = 10 ** 5;
  uint OWNER_PERCENT  = 1;

  struct Stake {
    address staker;
    uint amt;
    uint topicId;
    uint tagId;
  }

  Stake[] stakes;
  // user => tagId => topicId => stakeId
  mapping (address => mapping( uint => mapping (uint => uint))) public userStakes;
  mapping (address => uint) public tokenBalances;
  event StakeAdded(uint stakeIdx, address staker, uint totalAmt, uint stakeAmt, uint topicId, uint tagId);
  event StakeIncreased(uint stakeIdx, uint totalAmt, uint stakeAmt);
  event StakeDecreased(uint stakeIdx, uint amt);

  function getStake(uint _idx) public view returns (address staker, uint amount, uint topicId, uint tagId) {
    // we skip the 0 index so decrement the index by one to look it up in the stakes array
    Stake storage stake = stakes[_idx - 1];
    staker = stake.staker;
    amount = stake.amt;
    topicId = stake.topicId;
    tagId = stake.tagId;
  }

  function distributeStake(uint _amt, uint _topicId, address from) internal returns (uint){
    uint ownerShare = getPercentShare(OWNER_PERCENT, _amt, PRECISION);
    uint stakedShare = _amt - ownerShare;

    tokenBalances[from] -= _amt;
    tokenBalances[topics[_topicId].owner] += ownerShare;

    return stakedShare;
  }

  function addStake(uint _topicId, uint _tagId, uint _amt) public {
    require(userStakes[msg.sender][_topicId][_tagId] == 0, 'Stake already exists');
    require(tokenBalances[msg.sender] >= _amt, 'Insufficient token balance');

    uint stakeAmt = distributeStake(_amt, _topicId, msg.sender);
    Stake memory stake = Stake(msg.sender, stakeAmt, _topicId, _tagId);
    stakes.push(stake);
    // store the index after update so that 0 index represents null 
    uint256 stakeIdx = stakes.length;
    userStakes[msg.sender][_topicId][_tagId] = stakeIdx;

    emit StakeAdded(stakeIdx, msg.sender, _amt, stakeAmt, _topicId, _tagId);

  }

  function increaseStake(uint _stakeIdx, uint _amt) public {
    Stake storage stake = stakes[_stakeIdx - 1];
    require(stake.staker == msg.sender, 'Stake not owned by sender');
    require(tokenBalances[msg.sender] >= _amt, 'Insufficient token balance');

    uint stakeAmt = distributeStake(_amt, stake.topicId, msg.sender);
    stake.amt += stakeAmt;

    emit StakeIncreased(_stakeIdx, _amt, stakeAmt);
  }

  function reduceStake(uint _stakeIdx, uint _amt) public {
    Stake storage stake = stakes[_stakeIdx - 1];
    require(stake.staker == msg.sender, 'Stake not owned by sender');
    stake.amt -= _amt;
    tokenBalances[msg.sender] += _amt;

    emit StakeDecreased(_stakeIdx, _amt);

  }
 }
