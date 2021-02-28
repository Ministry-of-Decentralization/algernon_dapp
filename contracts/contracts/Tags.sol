pragma solidity ^0.8.0;

import "./Roles.sol";

/** @title Tags. */
contract Tags is Roles {

  struct Tag {
    string label;
    uint256 parent; 
  }

  mapping (string => bool) public tagExists;

  Tag[] private tags;

  event TagAdded(uint id, string tag, uint parent, address addedBy);
  event TagUpdated(uint id, string tag, uint parent, address updatedBy);


  function addTag(string memory _tag, uint256 _parent) public {
    require(hasRole(TAGGER_ROLE, msg.sender), "Caller is not a tagger");
    require(bytes(_tag).length != 0, 'Tag Cannot be an empty string');
    require(tagExists[_tag] == false, 'Tag already exists');

    // reserve 0 as null id for parentless tags
    uint256 id = tags.length + 1;
    Tag memory tag = Tag(_tag, _parent);
    tags.push(tag);
    tagExists[_tag] = true;
    emit TagAdded(id, _tag, _parent, msg.sender);
  }

  function updateParent(uint256 _id, uint256 _newParent) public {
    require(hasRole(TAGGER_ROLE, msg.sender), "Caller is not a tagger");

    uint256 id = _id - 1; 
    Tag storage tag = tags[id];

    require(tagExists[tag.label] == true, 'Tag does not exist');

    tag.parent = _newParent;

    emit TagUpdated(id, tag.label, tag.parent, msg.sender);
  }

  function getTagCount() public view returns (uint256) {
    return tags.length;
  }

  function getTag(uint256 _id) public view returns (uint256, string memory, uint256) {
    Tag storage tag = tags[_id - 1];
    return (_id, tag.label, tag.parent);
  }

}
