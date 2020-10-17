pragma solidity ^0.6.0;

/** @title Tags. */
contract Tags {

  mapping (string => bool) tagExists;
  string[] tags;

  event TagAdded(uint id, string tag, address addedBy);

  function addMasterTag(string memory _tag) public {
    require(tagExists[_tag] == false, 'Tag already exists');
    uint id = tags.length;
    tags.push(_tag);
    tagExists[_tag] = true;
    emit TagAdded(id, _tag, msg.sender);
  }

  function addTags(uint256[] memory _toAdd, uint256[] storage _sourceIdxs) internal {
    for (uint256 i; i < _toAdd.length; i++) {
      _sourceIdxs.push(_toAdd[i]);
    }
  }

  function removeTag(uint256 _toRemove, uint256[]  storage _sourceIdxs) internal {
    _sourceIdxs[_toRemove] = _sourceIdxs[_sourceIdxs.length-1];
    _sourceIdxs.pop();
  }

  function doesTagExist(string memory _tag) public view returns (bool) {
    return tagExists[_tag];
  }

  function getTagCount() public view returns (uint256) {
    return tags.length;
  }

  function getTag(uint256 _id) public view returns (string memory) {
    return tags[_id];
  }

}
