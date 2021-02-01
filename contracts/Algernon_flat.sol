// File: openzeppelin-solidity/contracts/utils/EnumerableSet.sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

/**
 * @dev Library for managing
 * https://en.wikipedia.org/wiki/Set_(abstract_data_type)[sets] of primitive
 * types.
 *
 * Sets have the following properties:
 *
 * - Elements are added, removed, and checked for existence in constant time
 * (O(1)).
 * - Elements are enumerated in O(n). No guarantees are made on the ordering.
 *
 * ```
 * contract Example {
 *     // Add the library methods
 *     using EnumerableSet for EnumerableSet.AddressSet;
 *
 *     // Declare a set state variable
 *     EnumerableSet.AddressSet private mySet;
 * }
 * ```
 *
 * As of v3.0.0, only sets of type `address` (`AddressSet`) and `uint256`
 * (`UintSet`) are supported.
 */
library EnumerableSet {
    // To implement this library for multiple types with as little code
    // repetition as possible, we write it in terms of a generic Set type with
    // bytes32 values.
    // The Set implementation uses private functions, and user-facing
    // implementations (such as AddressSet) are just wrappers around the
    // underlying Set.
    // This means that we can only create new EnumerableSets for types that fit
    // in bytes32.

    struct Set {
        // Storage of set values
        bytes32[] _values;

        // Position of the value in the `values` array, plus 1 because index 0
        // means a value is not in the set.
        mapping (bytes32 => uint256) _indexes;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function _add(Set storage set, bytes32 value) private returns (bool) {
        if (!_contains(set, value)) {
            set._values.push(value);
            // The value is stored at length-1, but we add 1 to all indexes
            // and use 0 as a sentinel value
            set._indexes[value] = set._values.length;
            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function _remove(Set storage set, bytes32 value) private returns (bool) {
        // We read and store the value's index to prevent multiple reads from the same storage slot
        uint256 valueIndex = set._indexes[value];

        if (valueIndex != 0) { // Equivalent to contains(set, value)
            // To delete an element from the _values array in O(1), we swap the element to delete with the last one in
            // the array, and then remove the last element (sometimes called as 'swap and pop').
            // This modifies the order of the array, as noted in {at}.

            uint256 toDeleteIndex = valueIndex - 1;
            uint256 lastIndex = set._values.length - 1;

            // When the value to delete is the last one, the swap operation is unnecessary. However, since this occurs
            // so rarely, we still do the swap anyway to avoid the gas cost of adding an 'if' statement.

            bytes32 lastvalue = set._values[lastIndex];

            // Move the last value to the index where the value to delete is
            set._values[toDeleteIndex] = lastvalue;
            // Update the index for the moved value
            set._indexes[lastvalue] = toDeleteIndex + 1; // All indexes are 1-based

            // Delete the slot where the moved value was stored
            set._values.pop();

            // Delete the index for the deleted slot
            delete set._indexes[value];

            return true;
        } else {
            return false;
        }
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function _contains(Set storage set, bytes32 value) private view returns (bool) {
        return set._indexes[value] != 0;
    }

    /**
     * @dev Returns the number of values on the set. O(1).
     */
    function _length(Set storage set) private view returns (uint256) {
        return set._values.length;
    }

   /**
    * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function _at(Set storage set, uint256 index) private view returns (bytes32) {
        require(set._values.length > index, "EnumerableSet: index out of bounds");
        return set._values[index];
    }

    // AddressSet

    struct AddressSet {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(AddressSet storage set, address value) internal returns (bool) {
        return _add(set._inner, bytes32(uint256(value)));
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(AddressSet storage set, address value) internal returns (bool) {
        return _remove(set._inner, bytes32(uint256(value)));
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(AddressSet storage set, address value) internal view returns (bool) {
        return _contains(set._inner, bytes32(uint256(value)));
    }

    /**
     * @dev Returns the number of values in the set. O(1).
     */
    function length(AddressSet storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

   /**
    * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function at(AddressSet storage set, uint256 index) internal view returns (address) {
        return address(uint256(_at(set._inner, index)));
    }


    // UintSet

    struct UintSet {
        Set _inner;
    }

    /**
     * @dev Add a value to a set. O(1).
     *
     * Returns true if the value was added to the set, that is if it was not
     * already present.
     */
    function add(UintSet storage set, uint256 value) internal returns (bool) {
        return _add(set._inner, bytes32(value));
    }

    /**
     * @dev Removes a value from a set. O(1).
     *
     * Returns true if the value was removed from the set, that is if it was
     * present.
     */
    function remove(UintSet storage set, uint256 value) internal returns (bool) {
        return _remove(set._inner, bytes32(value));
    }

    /**
     * @dev Returns true if the value is in the set. O(1).
     */
    function contains(UintSet storage set, uint256 value) internal view returns (bool) {
        return _contains(set._inner, bytes32(value));
    }

    /**
     * @dev Returns the number of values on the set. O(1).
     */
    function length(UintSet storage set) internal view returns (uint256) {
        return _length(set._inner);
    }

   /**
    * @dev Returns the value stored at position `index` in the set. O(1).
    *
    * Note that there are no guarantees on the ordering of values inside the
    * array, and it may change when more values are added or removed.
    *
    * Requirements:
    *
    * - `index` must be strictly less than {length}.
    */
    function at(UintSet storage set, uint256 index) internal view returns (uint256) {
        return uint256(_at(set._inner, index));
    }
}

// File: openzeppelin-solidity/contracts/utils/Address.sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.6.2;

/**
 * @dev Collection of functions related to the address type
 */
library Address {
    /**
     * @dev Returns true if `account` is a contract.
     *
     * [IMPORTANT]
     * ====
     * It is unsafe to assume that an address for which this function returns
     * false is an externally-owned account (EOA) and not a contract.
     *
     * Among others, `isContract` will return false for the following
     * types of addresses:
     *
     *  - an externally-owned account
     *  - a contract in construction
     *  - an address where a contract will be created
     *  - an address where a contract lived, but was destroyed
     * ====
     */
    function isContract(address account) internal view returns (bool) {
        // This method relies in extcodesize, which returns 0 for contracts in
        // construction, since the code is only stored at the end of the
        // constructor execution.

        uint256 size;
        // solhint-disable-next-line no-inline-assembly
        assembly { size := extcodesize(account) }
        return size > 0;
    }

    /**
     * @dev Replacement for Solidity's `transfer`: sends `amount` wei to
     * `recipient`, forwarding all available gas and reverting on errors.
     *
     * https://eips.ethereum.org/EIPS/eip-1884[EIP1884] increases the gas cost
     * of certain opcodes, possibly making contracts go over the 2300 gas limit
     * imposed by `transfer`, making them unable to receive funds via
     * `transfer`. {sendValue} removes this limitation.
     *
     * https://diligence.consensys.net/posts/2019/09/stop-using-soliditys-transfer-now/[Learn more].
     *
     * IMPORTANT: because control is transferred to `recipient`, care must be
     * taken to not create reentrancy vulnerabilities. Consider using
     * {ReentrancyGuard} or the
     * https://solidity.readthedocs.io/en/v0.5.11/security-considerations.html#use-the-checks-effects-interactions-pattern[checks-effects-interactions pattern].
     */
    function sendValue(address payable recipient, uint256 amount) internal {
        require(address(this).balance >= amount, "Address: insufficient balance");

        // solhint-disable-next-line avoid-low-level-calls, avoid-call-value
        (bool success, ) = recipient.call{ value: amount }("");
        require(success, "Address: unable to send value, recipient may have reverted");
    }

    /**
     * @dev Performs a Solidity function call using a low level `call`. A
     * plain`call` is an unsafe replacement for a function call: use this
     * function instead.
     *
     * If `target` reverts with a revert reason, it is bubbled up by this
     * function (like regular Solidity function calls).
     *
     * Returns the raw returned data. To convert to the expected return value,
     * use https://solidity.readthedocs.io/en/latest/units-and-global-variables.html?highlight=abi.decode#abi-encoding-and-decoding-functions[`abi.decode`].
     *
     * Requirements:
     *
     * - `target` must be a contract.
     * - calling `target` with `data` must not revert.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data) internal returns (bytes memory) {
      return functionCall(target, data, "Address: low-level call failed");
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`], but with
     * `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCall(address target, bytes memory data, string memory errorMessage) internal returns (bytes memory) {
        return _functionCallWithValue(target, data, 0, errorMessage);
    }

    /**
     * @dev Same as {xref-Address-functionCall-address-bytes-}[`functionCall`],
     * but also transferring `value` wei to `target`.
     *
     * Requirements:
     *
     * - the calling contract must have an ETH balance of at least `value`.
     * - the called Solidity function must be `payable`.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value) internal returns (bytes memory) {
        return functionCallWithValue(target, data, value, "Address: low-level call with value failed");
    }

    /**
     * @dev Same as {xref-Address-functionCallWithValue-address-bytes-uint256-}[`functionCallWithValue`], but
     * with `errorMessage` as a fallback revert reason when `target` reverts.
     *
     * _Available since v3.1._
     */
    function functionCallWithValue(address target, bytes memory data, uint256 value, string memory errorMessage) internal returns (bytes memory) {
        require(address(this).balance >= value, "Address: insufficient balance for call");
        return _functionCallWithValue(target, data, value, errorMessage);
    }

    function _functionCallWithValue(address target, bytes memory data, uint256 weiValue, string memory errorMessage) private returns (bytes memory) {
        require(isContract(target), "Address: call to non-contract");

        // solhint-disable-next-line avoid-low-level-calls
        (bool success, bytes memory returndata) = target.call{ value: weiValue }(data);
        if (success) {
            return returndata;
        } else {
            // Look for revert reason and bubble it up if present
            if (returndata.length > 0) {
                // The easiest way to bubble the revert reason is using memory via assembly

                // solhint-disable-next-line no-inline-assembly
                assembly {
                    let returndata_size := mload(returndata)
                    revert(add(32, returndata), returndata_size)
                }
            } else {
                revert(errorMessage);
            }
        }
    }
}

// File: openzeppelin-solidity/contracts/GSN/Context.sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

/*
 * @dev Provides information about the current execution context, including the
 * sender of the transaction and its data. While these are generally available
 * via msg.sender and msg.data, they should not be accessed in such a direct
 * manner, since when dealing with GSN meta-transactions the account sending and
 * paying for execution may not be the actual sender (as far as an application
 * is concerned).
 *
 * This contract is only required for intermediate, library-like contracts.
 */
abstract contract Context {
    function _msgSender() internal view virtual returns (address payable) {
        return msg.sender;
    }

    function _msgData() internal view virtual returns (bytes memory) {
        this; // silence state mutability warning without generating bytecode - see https://github.com/ethereum/solidity/issues/2691
        return msg.data;
    }
}

// File: openzeppelin-solidity/contracts/access/AccessControl.sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;




/**
 * @dev Contract module that allows children to implement role-based access
 * control mechanisms.
 *
 * Roles are referred to by their `bytes32` identifier. These should be exposed
 * in the external API and be unique. The best way to achieve this is by
 * using `public constant` hash digests:
 *
 * ```
 * bytes32 public constant MY_ROLE = keccak256("MY_ROLE");
 * ```
 *
 * Roles can be used to represent a set of permissions. To restrict access to a
 * function call, use {hasRole}:
 *
 * ```
 * function foo() public {
 *     require(hasRole(MY_ROLE, msg.sender));
 *     ...
 * }
 * ```
 *
 * Roles can be granted and revoked dynamically via the {grantRole} and
 * {revokeRole} functions. Each role has an associated admin role, and only
 * accounts that have a role's admin role can call {grantRole} and {revokeRole}.
 *
 * By default, the admin role for all roles is `DEFAULT_ADMIN_ROLE`, which means
 * that only accounts with this role will be able to grant or revoke other
 * roles. More complex role relationships can be created by using
 * {_setRoleAdmin}.
 *
 * WARNING: The `DEFAULT_ADMIN_ROLE` is also its own admin: it has permission to
 * grant and revoke this role. Extra precautions should be taken to secure
 * accounts that have been granted it.
 */
abstract contract AccessControl is Context {
    using EnumerableSet for EnumerableSet.AddressSet;
    using Address for address;

    struct RoleData {
        EnumerableSet.AddressSet members;
        bytes32 adminRole;
    }

    mapping (bytes32 => RoleData) private _roles;

    bytes32 public constant DEFAULT_ADMIN_ROLE = 0x00;

    /**
     * @dev Emitted when `newAdminRole` is set as ``role``'s admin role, replacing `previousAdminRole`
     *
     * `DEFAULT_ADMIN_ROLE` is the starting admin for all roles, despite
     * {RoleAdminChanged} not being emitted signaling this.
     *
     * _Available since v3.1._
     */
    event RoleAdminChanged(bytes32 indexed role, bytes32 indexed previousAdminRole, bytes32 indexed newAdminRole);

    /**
     * @dev Emitted when `account` is granted `role`.
     *
     * `sender` is the account that originated the contract call, an admin role
     * bearer except when using {_setupRole}.
     */
    event RoleGranted(bytes32 indexed role, address indexed account, address indexed sender);

    /**
     * @dev Emitted when `account` is revoked `role`.
     *
     * `sender` is the account that originated the contract call:
     *   - if using `revokeRole`, it is the admin role bearer
     *   - if using `renounceRole`, it is the role bearer (i.e. `account`)
     */
    event RoleRevoked(bytes32 indexed role, address indexed account, address indexed sender);

    /**
     * @dev Returns `true` if `account` has been granted `role`.
     */
    function hasRole(bytes32 role, address account) public view returns (bool) {
        return _roles[role].members.contains(account);
    }

    /**
     * @dev Returns the number of accounts that have `role`. Can be used
     * together with {getRoleMember} to enumerate all bearers of a role.
     */
    function getRoleMemberCount(bytes32 role) public view returns (uint256) {
        return _roles[role].members.length();
    }

    /**
     * @dev Returns one of the accounts that have `role`. `index` must be a
     * value between 0 and {getRoleMemberCount}, non-inclusive.
     *
     * Role bearers are not sorted in any particular way, and their ordering may
     * change at any point.
     *
     * WARNING: When using {getRoleMember} and {getRoleMemberCount}, make sure
     * you perform all queries on the same block. See the following
     * https://forum.openzeppelin.com/t/iterating-over-elements-on-enumerableset-in-openzeppelin-contracts/2296[forum post]
     * for more information.
     */
    function getRoleMember(bytes32 role, uint256 index) public view returns (address) {
        return _roles[role].members.at(index);
    }

    /**
     * @dev Returns the admin role that controls `role`. See {grantRole} and
     * {revokeRole}.
     *
     * To change a role's admin, use {_setRoleAdmin}.
     */
    function getRoleAdmin(bytes32 role) public view returns (bytes32) {
        return _roles[role].adminRole;
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function grantRole(bytes32 role, address account) public virtual {
        require(hasRole(_roles[role].adminRole, _msgSender()), "AccessControl: sender must be an admin to grant");

        _grantRole(role, account);
    }

    /**
     * @dev Revokes `role` from `account`.
     *
     * If `account` had been granted `role`, emits a {RoleRevoked} event.
     *
     * Requirements:
     *
     * - the caller must have ``role``'s admin role.
     */
    function revokeRole(bytes32 role, address account) public virtual {
        require(hasRole(_roles[role].adminRole, _msgSender()), "AccessControl: sender must be an admin to revoke");

        _revokeRole(role, account);
    }

    /**
     * @dev Revokes `role` from the calling account.
     *
     * Roles are often managed via {grantRole} and {revokeRole}: this function's
     * purpose is to provide a mechanism for accounts to lose their privileges
     * if they are compromised (such as when a trusted device is misplaced).
     *
     * If the calling account had been granted `role`, emits a {RoleRevoked}
     * event.
     *
     * Requirements:
     *
     * - the caller must be `account`.
     */
    function renounceRole(bytes32 role, address account) public virtual {
        require(account == _msgSender(), "AccessControl: can only renounce roles for self");

        _revokeRole(role, account);
    }

    /**
     * @dev Grants `role` to `account`.
     *
     * If `account` had not been already granted `role`, emits a {RoleGranted}
     * event. Note that unlike {grantRole}, this function doesn't perform any
     * checks on the calling account.
     *
     * [WARNING]
     * ====
     * This function should only be called from the constructor when setting
     * up the initial roles for the system.
     *
     * Using this function in any other way is effectively circumventing the admin
     * system imposed by {AccessControl}.
     * ====
     */
    function _setupRole(bytes32 role, address account) internal virtual {
        _grantRole(role, account);
    }

    /**
     * @dev Sets `adminRole` as ``role``'s admin role.
     *
     * Emits a {RoleAdminChanged} event.
     */
    function _setRoleAdmin(bytes32 role, bytes32 adminRole) internal virtual {
        emit RoleAdminChanged(role, _roles[role].adminRole, adminRole);
        _roles[role].adminRole = adminRole;
    }

    function _grantRole(bytes32 role, address account) private {
        if (_roles[role].members.add(account)) {
            emit RoleGranted(role, account, _msgSender());
        }
    }

    function _revokeRole(bytes32 role, address account) private {
        if (_roles[role].members.remove(account)) {
            emit RoleRevoked(role, account, _msgSender());
        }
    }
}

// File: contracts/Roles.sol

// contracts/Roles.sol
// SPDX-License-Identifier: MIT
pragma solidity ^0.6.0;


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

    function grantAdminRole(address _addr) public {
        grantRole(DEFAULT_ADMIN_ROLE, _addr);
    }

    function revokeAdminRole(address _addr) public {
        revokeRole(DEFAULT_ADMIN_ROLE, _addr);
    }

    function isTagger(address _addr) public view returns (bool) {
        return hasRole(TAGGER_ROLE, _addr);
    }

    function grantTaggerRole(address _addr) public {
        grantRole(TAGGER_ROLE, _addr);
    }

    function revokeTaggerRole(address _addr) public {
        revokeRole(TAGGER_ROLE, _addr);
    }
}

// File: contracts/Tags.sol

pragma solidity ^0.6.0;


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

// File: contracts/Topics.sol

pragma solidity ^0.6.0;


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

// File: contracts/TaggedTopics.sol

pragma solidity ^0.6.0;


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

// File: contracts/SafeMath.sol

pragma solidity ^0.6.0;

/**
 * @title SafeMath
 * @dev Math operations with safety checks that revert on error
 */
library SafeMath {
  int256 constant private INT256_MIN = -2**255;

  /**
  * @dev Multiplies two unsigned integers, reverts on overflow.
  */
  function mul(uint256 a, uint256 b) internal pure returns (uint256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (a == 0) {
      return 0;
    }

    uint256 c = a * b;
    require(c / a == b);

    return c;
  }

  /**
  * @dev Multiplies two signed integers, reverts on overflow.
  */
  function mul(int256 a, int256 b) internal pure returns (int256) {
    // Gas optimization: this is cheaper than requiring 'a' not being zero, but the
    // benefit is lost if 'b' is also tested.
    // See: https://github.com/OpenZeppelin/openzeppelin-solidity/pull/522
    if (a == 0) {
      return 0;
    }

    require(!(a == -1 && b == INT256_MIN)); // This is the only case of overflow not detected by the check below

    int256 c = a * b;
    require(c / a == b);

    return c;
  }

  /**
  * @dev Integer division of two unsigned integers truncating the quotient, reverts on division by zero.
  */
  function div(uint256 a, uint256 b) internal pure returns (uint256) {
    // Solidity only automatically asserts when dividing by 0
    require(b > 0);
    uint256 c = a / b;
    // assert(a == b * c + a % b); // There is no case in which this doesn't hold

    return c;
  }

  /**
  * @dev Integer division of two signed integers truncating the quotient, reverts on division by zero.
  */
  function div(int256 a, int256 b) internal pure returns (int256) {
    require(b != 0); // Solidity only automatically asserts when dividing by 0
    require(!(b == -1 && a == INT256_MIN)); // This is the only case of overflow

    int256 c = a / b;

    return c;
  }

  /**
  * @dev Subtracts two unsigned integers, reverts on overflow (i.e. if subtrahend is greater than minuend).
  */
  function sub(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b <= a);
    uint256 c = a - b;

    return c;
  }

  /**
  * @dev Subtracts two signed integers, reverts on overflow.
  */
  function sub(int256 a, int256 b) internal pure returns (int256) {
    int256 c = a - b;
    require((b >= 0 && c <= a) || (b < 0 && c > a));

    return c;
  }

  /**
  * @dev Adds two unsigned integers, reverts on overflow.
  */
  function add(uint256 a, uint256 b) internal pure returns (uint256) {
    uint256 c = a + b;
    require(c >= a);

    return c;
  }

  /**
  * @dev Adds two signed integers, reverts on overflow.
  */
  function add(int256 a, int256 b) internal pure returns (int256) {
    int256 c = a + b;
    require((b >= 0 && c >= a) || (b < 0 && c < a));

    return c;
  }

  /**
  * @dev Divides two unsigned integers and returns the remainder (unsigned integer modulo),
  * reverts when dividing by zero.
  */
  function mod(uint256 a, uint256 b) internal pure returns (uint256) {
    require(b != 0);
    return a % b;
  }
}

// File: contracts/Percent.sol

pragma solidity ^0.6.0;


/** @title Percent. */
contract Percent {
  using SafeMath for uint;

  function getPercent(uint _share, uint _total, uint _toSplit) internal pure returns(uint) {
  return _share.mul(_toSplit).div(_total);
  }

  function getPercentShare(uint _percent, uint _total, uint _precision) internal pure returns(uint) {
  return _total.mul(_percent).mul(_precision).div(_precision.mul(100));
  }

}

// File: openzeppelin-solidity/contracts/token/ERC777/IERC777.sol

// SPDX-License-Identifier: MIT

pragma solidity ^0.6.0;

/**
 * @dev Interface of the ERC777Token standard as defined in the EIP.
 *
 * This contract uses the
 * https://eips.ethereum.org/EIPS/eip-1820[ERC1820 registry standard] to let
 * token holders and recipients react to token movements by using setting implementers
 * for the associated interfaces in said registry. See {IERC1820Registry} and
 * {ERC1820Implementer}.
 */
interface IERC777 {
    /**
     * @dev Returns the name of the token.
     */
    function name() external view returns (string memory);

    /**
     * @dev Returns the symbol of the token, usually a shorter version of the
     * name.
     */
    function symbol() external view returns (string memory);

    /**
     * @dev Returns the smallest part of the token that is not divisible. This
     * means all token operations (creation, movement and destruction) must have
     * amounts that are a multiple of this number.
     *
     * For most token contracts, this value will equal 1.
     */
    function granularity() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens in existence.
     */
    function totalSupply() external view returns (uint256);

    /**
     * @dev Returns the amount of tokens owned by an account (`owner`).
     */
    function balanceOf(address owner) external view returns (uint256);

    /**
     * @dev Moves `amount` tokens from the caller's account to `recipient`.
     *
     * If send or receive hooks are registered for the caller and `recipient`,
     * the corresponding functions will be called with `data` and empty
     * `operatorData`. See {IERC777Sender} and {IERC777Recipient}.
     *
     * Emits a {Sent} event.
     *
     * Requirements
     *
     * - the caller must have at least `amount` tokens.
     * - `recipient` cannot be the zero address.
     * - if `recipient` is a contract, it must implement the {IERC777Recipient}
     * interface.
     */
    function send(address recipient, uint256 amount, bytes calldata data) external;

    /**
     * @dev Destroys `amount` tokens from the caller's account, reducing the
     * total supply.
     *
     * If a send hook is registered for the caller, the corresponding function
     * will be called with `data` and empty `operatorData`. See {IERC777Sender}.
     *
     * Emits a {Burned} event.
     *
     * Requirements
     *
     * - the caller must have at least `amount` tokens.
     */
    function burn(uint256 amount, bytes calldata data) external;

    /**
     * @dev Returns true if an account is an operator of `tokenHolder`.
     * Operators can send and burn tokens on behalf of their owners. All
     * accounts are their own operator.
     *
     * See {operatorSend} and {operatorBurn}.
     */
    function isOperatorFor(address operator, address tokenHolder) external view returns (bool);

    /**
     * @dev Make an account an operator of the caller.
     *
     * See {isOperatorFor}.
     *
     * Emits an {AuthorizedOperator} event.
     *
     * Requirements
     *
     * - `operator` cannot be calling address.
     */
    function authorizeOperator(address operator) external;

    /**
     * @dev Revoke an account's operator status for the caller.
     *
     * See {isOperatorFor} and {defaultOperators}.
     *
     * Emits a {RevokedOperator} event.
     *
     * Requirements
     *
     * - `operator` cannot be calling address.
     */
    function revokeOperator(address operator) external;

    /**
     * @dev Returns the list of default operators. These accounts are operators
     * for all token holders, even if {authorizeOperator} was never called on
     * them.
     *
     * This list is immutable, but individual holders may revoke these via
     * {revokeOperator}, in which case {isOperatorFor} will return false.
     */
    function defaultOperators() external view returns (address[] memory);

    /**
     * @dev Moves `amount` tokens from `sender` to `recipient`. The caller must
     * be an operator of `sender`.
     *
     * If send or receive hooks are registered for `sender` and `recipient`,
     * the corresponding functions will be called with `data` and
     * `operatorData`. See {IERC777Sender} and {IERC777Recipient}.
     *
     * Emits a {Sent} event.
     *
     * Requirements
     *
     * - `sender` cannot be the zero address.
     * - `sender` must have at least `amount` tokens.
     * - the caller must be an operator for `sender`.
     * - `recipient` cannot be the zero address.
     * - if `recipient` is a contract, it must implement the {IERC777Recipient}
     * interface.
     */
    function operatorSend(
        address sender,
        address recipient,
        uint256 amount,
        bytes calldata data,
        bytes calldata operatorData
    ) external;

    /**
     * @dev Destroys `amount` tokens from `account`, reducing the total supply.
     * The caller must be an operator of `account`.
     *
     * If a send hook is registered for `account`, the corresponding function
     * will be called with `data` and `operatorData`. See {IERC777Sender}.
     *
     * Emits a {Burned} event.
     *
     * Requirements
     *
     * - `account` cannot be the zero address.
     * - `account` must have at least `amount` tokens.
     * - the caller must be an operator for `account`.
     */
    function operatorBurn(
        address account,
        uint256 amount,
        bytes calldata data,
        bytes calldata operatorData
    ) external;

    event Sent(
        address indexed operator,
        address indexed from,
        address indexed to,
        uint256 amount,
        bytes data,
        bytes operatorData
    );

    event Minted(address indexed operator, address indexed to, uint256 amount, bytes data, bytes operatorData);

    event Burned(address indexed operator, address indexed from, uint256 amount, bytes data, bytes operatorData);

    event AuthorizedOperator(address indexed operator, address indexed tokenHolder);

    event RevokedOperator(address indexed operator, address indexed tokenHolder);
}

// File: contracts/Algernon.sol

pragma solidity ^0.6.0;




contract Algernon is TaggedTopics, Percent {
  address owner;
  address TOKEN_ADDRESS;
  address COMMUNITY_ADDRESS;
  uint constant DAILY_SECONDS = 86400;

  uint PRECISION = 10 ** 5;
  uint OWNER_PERCENT  = 1;
  uint STAKER_PERCENT = 2;
  uint COMMUNITY_PERCENT = 1;
  uint STAKE_TIME_LIMIT = 1 * DAILY_SECONDS;
  mapping (address => uint) public tokenBalances;

  constructor (address _tokenAddress) public {
    owner = msg.sender;
    TOKEN_ADDRESS = _tokenAddress;
  }

  function createTopic(uint256[] memory _tagIds, string memory fileName) public returns (uint) {
    uint topicId = createUserTopic(fileName, _tagIds, msg.sender);

    return topicId;
  }

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

  function getContractTokenBalance() public view returns (uint256) {
    return IERC777(TOKEN_ADDRESS).balanceOf(address(this));
  }

  function getAlgernonTokenBalance(address _account) public view returns (uint) {
    return tokenBalances[_account];
  }

  function depositTokens(uint _amt) public {
    uint depositerBalance = IERC777(TOKEN_ADDRESS).balanceOf(msg.sender);
    require(depositerBalance >= _amt, 'Insufficient token balance');

    IERC777(TOKEN_ADDRESS).operatorSend(msg.sender, address(this), _amt, "", "");
    tokenBalances[msg.sender] += _amt;
  }

  function withdrawTokens(uint _amt) public {
    require(tokenBalances[msg.sender] >= _amt, 'Insufficient token balance');
    tokenBalances[msg.sender] -= _amt;
    IERC777(TOKEN_ADDRESS).send(msg.sender, _amt, "");

  }
 }
