pragma solidity ^0.6.0;

import './Tags.sol';

/** @title Users. */
contract Topics is Tags {
  uint256 topicId;

  struct Topic {
    uint256 id;
    uint[] tagIds;
    address owner;
    string content;
  }

  Topic[] topics;
  mapping (address => uint256[]) userTopicIds;

  event TopicCreated(uint256 id, uint256[] tagIds, address indexed owner, string content);
  event TopicUpdated(uint256 id, uint256[] tagIds, string content);
  event TopicTagsUpdated(uint256 id, uint256[] tagIds);

  function createUserTopic(string memory _fileName, uint256[] memory _tagIds, address _user) internal returns (uint256) {
    Topic memory topic = Topic(topicId, _tagIds, _user, _fileName);
    topics.push(topic);
    userTopicIds[_user].push(topic.id);
    topicId++;
    emit TopicCreated(topic.id, topic.tagIds, topic.owner, topic.content);

    return topic.id;
  }

  function updateTopic(uint256 _id, uint256[] memory _tagIds, string memory _fileName) public {
    Topic storage topic = topics[_id];
    topic.content = _fileName;
    topic.tagIds = _tagIds;
    emit TopicUpdated(topic.id, topic.tagIds, topic.content);
  }


  function updateTopicTags(uint256[] memory _tagIds, uint256 _topicId) public {
    Topic storage topic = topics[_topicId];
    topic.tagIds = _tagIds;
    emit TopicTagsUpdated(topic.id, topic.tagIds);
  } 

  function getTopicCount() public view returns (uint256) {
    return topics.length;
  }

  function getUserTopicCount(address _user) public view returns (uint256) {
    return userTopicIds[_user].length;
  }

  function getUserTopicIds(address _user) public view returns (uint256[] memory) {
    return userTopicIds[_user];
  }

  function getTopicInfo(Topic storage _topic) internal view returns (string memory content, address owner) {
    content = _topic.content;
    owner = _topic.owner;
  }

  function getTopic(uint256 _id) public view returns (string memory content, address owner, uint256[] memory tagIds) {
    content = topics[_id].content;
    owner = topics[_id].owner;
    tagIds = topics[_id].tagIds;
  }

  function getTopicTagIds( uint256 _id) public view returns (uint256[] memory) {
    return topics[_id].tagIds;
  }

}
