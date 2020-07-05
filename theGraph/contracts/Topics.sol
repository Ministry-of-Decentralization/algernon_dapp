pragma solidity ^0.5.0;

import './Multihash.sol';
import './Tags.sol';

/** @title Users. */
contract Topics is Multihash, Tags {
  uint256 topicId;
  uint256 privateTopicId;

  struct Topic {
    uint256 id;
    uint[] tagIds;
    address owner;
    string content;
  }

  Topic[] topics;
  Topic[] privateTopics;
  mapping (address => uint256[]) userTopicIds;
  mapping (address => uint256[]) userPrivateTopicIds;

  event TopicCreated(uint256 id, uint256[] tagIds, address indexed owner, string content);
  event TopicUpdated(uint256 id, string content);
  event TopicTagsUpdated(uint256 id, uint256[] tagIds);

  function createUserTopic(string memory _fileName, address _user) internal returns (uint256) {
    uint[] memory defaultTagIds;
    Topic memory topic = Topic(topicId, defaultTagIds, _user, _fileName);
    topics.push(topic);
    userTopicIds[msg.sender].push(topic.id);
    topicId++;
    emit TopicCreated(topic.id, topic.tagIds, topic.owner, topic.content);

    return topic.id;
  }

  function createPrivateUserTopic(uint256[] memory _tagIds, string memory _fileName, address _user) internal returns (uint256) {
    Topic memory topic = Topic(privateTopicId, _tagIds, _user, _fileName);
    privateTopics.push(topic);
    userPrivateTopicIds[msg.sender].push(topic.id);
    privateTopicId++;
    emit TopicCreated(topic.id, topic.tagIds, topic.owner, topic.content);

    return topic.id;
  }

  function createPrivateTopic(uint256[] memory _tagIds, string memory _fileName) public {
    createPrivateUserTopic(_tagIds, _fileName, msg.sender);
  }

  function updateTopic(uint256 _id, string memory _fileName) public {
    Topic storage topic = topics[_id];
    require(topic.owner == msg.sender, 'Topic to update must be owned by sender');
    topic.content = _fileName;
    emit TopicUpdated(topic.id, topic.content);
  }

  function updatePrivateTopic(uint256 _id, string memory _fileName) public {
    Topic storage topic = privateTopics[_id];
    require(topic.owner == msg.sender, 'Topic to update must be owned by sender');
    topic.content = _fileName;
    emit TopicUpdated(topic.id, topic.content);
  }


  function updateTopicTags( uint256[] memory _tagIds, uint256 _topicId) public {
    Topic storage topic = topics[_topicId];
    require(topic.owner == msg.sender);
    topic.tagIds = _tagIds;
    emit TopicTagsUpdated(topic.id, topic.tagIds);
  } 

  function updatePrivateTopicTags( uint256[] memory _tagIds, uint256 _topicId) public {
    Topic storage topic = privateTopics[_topicId];
    require(topic.owner == msg.sender);
    topic.tagIds = _tagIds;
    emit TopicTagsUpdated(topic.id, topic.tagIds);
  }

  function getTopicCount() public view returns (uint256) {
    return topics.length;
  }

  function getUserTopicCount(address _user) public view returns (uint256) {
    return userTopicIds[_user].length;
  }

  function getUserPrivateTopicCount(address _user) public view returns (uint256) {
    return userPrivateTopicIds[_user].length;
  }

  function getUserTopicIds(address _user) public view returns (uint256[] memory) {
    return userTopicIds[_user];
  }

  function getUserPrivateTopicIds() public view returns (uint256[] memory) {
    return userPrivateTopicIds[msg.sender];
  }

  function getTopicInfo(Topic storage _topic) internal view returns (string memory content, address owner) {
    content = _topic.content;
    owner = _topic.owner;
  }

  function getTopic(uint256 _id) public view returns (string memory, address, uint256[] memory) {
    return (topics[_id].content, topics[_id].owner, topics[_id].tagIds);
  }

  function getTopicTagIds( uint256 _id) public view returns (uint256[] memory) {
    return topics[_id].tagIds;
  }

  function getPrivateTopic(uint256 _id) public view returns (string memory, address) {
    require(msg.sender == privateTopics[_id].owner, 'Must own private topics to view');
    return getTopicInfo(privateTopics[_id]);
  }

  function getPrivateTopicTagIds( uint256 _id) public view returns (uint256[] memory) {
    require(msg.sender == privateTopics[_id].owner, 'Must own private topics to view');
    return privateTopics[_id].tagIds;
  }

}
