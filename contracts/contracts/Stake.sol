pragma solidity ^0.8.0;

import './TaggedTopics.sol';
import './Percent.sol';
import "openzeppelin-solidity/contracts/token/ERC777/IERC777.sol";

import './SafeMath.sol';

contract Stake is TaggedTopics, Percent {
  using SafeMath for uint;

  address TOKEN_ADDRESS;
  address COMMUNITY_ADDRESS;
  uint constant DAILY_SECONDS = 86400;

  uint PRECISION = 10 ** 5;
  uint OWNER_PERCENT  = 1;
  uint STAKER_PERCENT = 2;
  mapping (address => uint) public tokenBalances;


  //when a user stakes, 15% is given to the topic owner, 10% is distributed among stakers
  //the remaining 75% is staked
  function distributeStake(TagStake storage _tagStake, uint _amt, uint _topicId, address from) internal returns (uint){
    uint ownerShare = getPercentShare(OWNER_PERCENT, _amt, PRECISION);
    uint stakerShare = getPercentShare(STAKER_PERCENT, _amt, PRECISION);
    uint stakedShare = _amt.sub(ownerShare.add(stakerShare));

    tokenBalances[from] -= _amt;
    tokenBalances[topics[_topicId].owner] += ownerShare;


    for (uint i = 0;i < _tagStake.stakeIdxs.length;i++) {
      Stake storage stake = stakes[_tagStake.stakeIdxs[i]];
      uint share = getPercent(stake.amt, _tagStake.totalStaked, stakerShare);
      stakerShare -= share;
      tokenBalances[stake.staker] += share;
    }

    stakedShare += stakerShare;
    return stakedShare;
  }

  function addStake(uint _topicId, uint _tagId, uint _amt) public {
    require(topicIsTagged[_topicId][_tagId], 'Topic must be tagged');
    require(tokenBalances[msg.sender] >= _amt, 'Insufficient token balance');

    TagStake storage tagStake = stakesByTopic[_topicId][_tagId];
    uint stakeAmt = distributeStake(tagStake, _amt, _topicId, msg.sender);
    Stake memory stake = Stake(msg.sender, stakeAmt, _topicId, _tagId);
    stakes.push(stake);
    tagStake.totalStaked += stakeAmt;
    tagStake.stakeIdxs.push(stakes.length-1);
    stakesByUser[msg.sender].push(stakes.length-1);

    emit StakeAdded(msg.sender, _amt, stakeAmt, _topicId, _tagId);

  }

  function increaseStake(uint _stakeIdx, uint _amt) public {
    Stake storage stake = stakes[_stakeIdx];
    require(stake.staker == msg.sender, 'Stake not owned by sender');
    require(tokenBalances[msg.sender] >= _amt, 'Insufficient token balance');

    TagStake storage tagStake = stakesByTopic[stake.topicId][stake.tagId];
    uint stakeAmt = distributeStake(tagStake, _amt, stake.topicId, msg.sender);
    tagStake.totalStaked += stakeAmt;
    stake.amt += stakeAmt;

    emit StakeUpdated(stake.amt, _stakeIdx);
  }

  function reduceStake(uint _stakeIdx, uint _amt) public {
    Stake storage stake = stakes[_stakeIdx];
    require(stake.staker == msg.sender, 'Stake not owned by sender');
    stake.amt -= _amt;
    tokenBalances[msg.sender] += _amt;

    stakesByTopic[stake.topicId][stake.tagId].totalStaked -= _amt;

    emit StakeUpdated(stake.amt, _stakeIdx);

  }
 }
