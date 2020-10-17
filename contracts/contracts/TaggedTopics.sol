pragma solidity ^0.6.0;

import './Topics.sol';

/** @title TopicTags. */
contract TaggedTopics is Topics {

  struct Stake {
    address staker;
    uint amt;
    uint topicId;
    uint tagId;
  }

  struct TagStake {
    uint totalStaked;
    uint[] stakeIdxs;
  }

  Stake[] stakes;
  //topicId -> tagId -> stakeIdx
  mapping (uint => mapping (uint => TagStake)) stakesByTopic;
  //topicId -> tagId -> bool
  mapping (uint => mapping (uint => bool)) topicIsTagged;

  mapping (address => uint[]) stakesByUser;

  //tagId -> address => topicId
  mapping (uint => mapping(address => uint[])) userTopicsByTag;
  mapping (uint => mapping(address => bool)) userHasTagged;
  mapping (uint => address[]) usersByTag;

  event TopicTagUpdated(uint topicId, uint tagId, bool added);
  event StakeAdded(address staker, uint totalAmt, uint stakeAmt, uint topicId, uint tagId);
  event StakeUpdated(uint amt, uint stakeIdx);

  function updateTopicTags(uint[] memory _addIds, uint[] memory _removeIds, uint[] memory _topicTagIdxs, uint[] memory _taggedUserTopicIdxs, uint _topicId) public {
  for (uint i=0; i < _removeIds.length;i++) {
    removeTagTopic(_topicId, _removeIds[i], _topicTagIdxs[i], _taggedUserTopicIdxs[i]);
  }

  for (uint t = 0; t<_addIds.length;t++) {
    addTagTopic(_topicId, _addIds[t]);
  }
  }


  function addTagTopic(uint _topicId, uint _tagId) internal {
  require(topicIsTagged[_topicId][_tagId] == false, 'Topic is already tagged');
  require(topics[_topicId].owner == msg.sender, 'Only topic owner can update tags');

  if (userHasTagged[_tagId][msg.sender] == false) {
    userHasTagged[_tagId][msg.sender] = true;
    usersByTag[_tagId].push(msg.sender);
  }

  topicIsTagged[_topicId][_tagId] = true;
  userTopicsByTag[_tagId][msg.sender].push(_topicId);
  topics[_topicId].tagIds.push(_tagId);

  emit TopicTagUpdated(_topicId, _tagId, true);
  }


  function removeTagTopic(uint _topicId, uint _tagId, uint _topicTagsIdx, uint _taggedUserTopicsIdx) internal {
  require(topicIsTagged[_topicId][_tagId] == true, 'Topic is not tagged');
  require(topics[_topicId].owner == msg.sender, 'Only topic owner can update tags');
  require(topics[_topicId].tagIds[_topicTagsIdx] ==_tagId, 'Tag id and index mismatch');
  require(userTopicsByTag[_tagId][msg.sender][_taggedUserTopicsIdx] ==_topicId, 'Topic id and index mismatch');

  topicIsTagged[_topicId][_tagId] = false;

  topics[_topicId].tagIds[_topicTagsIdx] = topics[_topicId].tagIds[topics[_topicId].tagIds.length-1];

  topics[_topicId].tagIds.pop();

  userTopicsByTag[_tagId][msg.sender][_taggedUserTopicsIdx] = userTopicsByTag[_tagId][msg.sender][userTopicsByTag[_tagId][msg.sender].length-1];

  userTopicsByTag[_tagId][msg.sender].pop();

  emit TopicTagUpdated(_topicId, _tagId, false);
  }

  function getTagAddresses(uint _tagId) public view returns (address[] memory) {
  return usersByTag[_tagId];
  }

  function getTagAddressTopicIds(uint _tagId, address _address) public view returns (uint[] memory) {
  return userTopicsByTag[_tagId][_address];
  }

  function getTopicTagStakeTotal(uint _topicId, uint _tagId) public view returns (uint) {
  return stakesByTopic[_topicId][_tagId].totalStaked;
  }

  function getTopicTagStakes(uint _topicId, uint _tagId) public view returns (uint[] memory idxs, uint[] memory amts, address[] memory stakers) {
  uint stakesLength = stakesByTopic[_topicId][_tagId].stakeIdxs.length;
  stakers = new address[](stakesLength);
  amts = new uint256[](stakesLength);
  idxs = new uint256[](stakesLength);
  for (uint i = 0;i < stakesLength;i++) {
    Stake storage stake = stakes[stakesByTopic[_topicId][_tagId].stakeIdxs[i]];
    stakers[i] = stake.staker;
    amts[i] = stake.amt;
    idxs[i] = stakesByTopic[_topicId][_tagId].stakeIdxs[i];
  }
  return (idxs, amts, stakers);
  }

  function getUserStakeIds(address _address) public view returns (uint[] memory) {
  return stakesByUser[_address];
  }

}
