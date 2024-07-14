// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";

contract Splitwiser {
    struct Debt {
        string name;
        address debtor;
        address creditor;
        uint256 amount;
        bool paid;
    }

    struct Group {
        string groupName;
        address[] members;
        mapping(uint256 => Debt) debts; // A mapping from debtId to actual Debt
        uint256 nextDebtId;
        address token;
    }

    // (Optimization) Data structure to keep track of what a person owe and
    // in what group.
    struct PaymentToDo {
        address creditor;
        uint256 amount;
    }

    event GroupCreated(uint256 indexed groupId, address creator);

    uint256 private nextGroupId = 1; // Keep track of the next groupId
    mapping(uint256 => Group) public groups;
    mapping(address => uint256[]) public pendingGroupInvites; // Database of pending user invitations to a group(s)

    // (Optimization) A mapping address => groupId => balance
    // to keep track of user balance in smart contract
    mapping(address => mapping(uint256 => int256)) public balances;
    mapping(uint256 => mapping(address => int256)) public balances_new;
    // (Optimization) A mapping of address => groupId => payments ( creditor + amt )
    // to keep track of what a person owe and in what group. Faster and cheaper than iterating all groups.
    mapping(address => mapping(uint256 => PaymentToDo[])) private paymentsToDo;

    // Event to notify users if a new debt is added
    event DebtAdded(uint256 indexed groupId, uint256 indexed debtId, address indexed debtor, address creditor, uint256 amount, string name);

    modifier onlyMember(uint256 _groupId) {
        require(isMember(_groupId, msg.sender), "You are not a member of this group");
        _;
    }

    function getGroupName(uint256 _groupId) external view returns (string memory) {
        require(_groupId < nextGroupId, "Group does not exists.");
        return groups[_groupId].groupName;
    }

    function acceptInvite(uint256 _groupId) public {
        uint256[] storage invitations = pendingGroupInvites[msg.sender];
        require(invitations.length > 0, "No pending invites");
        for(uint i = 0; i < invitations.length; i++) {
            if(invitations[i] == _groupId){
                delete pendingGroupInvites[msg.sender][i];
                _addMember(_groupId, msg.sender);
            }
        }
    }

    function _addMember(uint256 _groupId, address _member) internal {
        groups[_groupId].members.push(_member);
        balances[_member][_groupId] = 0;
    }

    function getUserGroups() external view returns (uint256[] memory) {
        uint256 count = 0;
        uint256[] memory tempGroups = new uint256[](nextGroupId - 1);
        for (uint256 i = 1; i < nextGroupId; i++) {
            if (isMember(i, msg.sender)) {
                tempGroups[count++] = i;
            }
        }

        uint256[] memory userGroups = new uint256[](count);
        for (uint256 j = 0; j < count; j++) {
            userGroups[j] = tempGroups[j];
        }

        return userGroups;
    }

    function createGroup(string memory _name, address[] memory _members, address _token) external {
        uint256 currentGroupId = nextGroupId;
        Group storage newGroup = groups[currentGroupId];
        nextGroupId = nextGroupId + 1;
        newGroup.groupName = _name;

        for (uint i = 0; i < _members.length; i++) {
            _addMember(currentGroupId, _members[i]);
        }
        _addMember(currentGroupId, msg.sender);

        newGroup.nextDebtId = 1;
        newGroup.token = _token;
        emit GroupCreated(currentGroupId, msg.sender);
    }

    function isMember(uint256 _groupId, address _member) internal view returns (bool) {
        address[] memory members = groups[_groupId].members;
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == _member) {
                return true;
            }
        }
        return false;
    }

    function isPending(uint256 _groupId, address _member) internal view returns (bool) {
        for(uint i = 0; i < pendingGroupInvites[_member].length; i++) {
            if (pendingGroupInvites[_member][i] == _groupId) {
                return true;
            }
        }
        return false;
    }

    function inviteMember(uint256 _groupId, address _invited) public onlyMember(_groupId) {
        require(!isPending(_groupId, _invited) && !isMember(_groupId, _invited), "Member is already in (pending) group");
        pendingGroupInvites[_invited].push(_groupId);
    }

    function removeInvite(uint256 _groupId, address _invited) public onlyMember(_groupId) {
        require(!isMember(_groupId, _invited), "Member is already in group");
        uint256[] storage invites = pendingGroupInvites[_invited];
        for (uint i = 0; i < invites.length; i++) {
            if (invites[i] == _groupId) {
                invites[i] = invites[invites.length - 1];
                invites.pop();
                break;
            }
        }
    }

    function addDebts(uint256 _groupId, address[] memory _debtors, address _creditor, uint256[] memory _amounts, string memory _name) external onlyMember(_groupId) {
        require(isMember(_groupId, _creditor), "Creditor must be a group member");
        for(uint32 i=0; i<_debtors.length; i++){
            require(isMember(_groupId, _debtors[i]), "Debtor must be a group member");
            _addDebt(_groupId, _debtors[i], _creditor, _amounts[i], _name);
        }
    }

    function _addDebt(uint256 _groupId, address _debitor, address _creditor, uint256 _amount, string memory _name) internal {
        Group storage group = groups[_groupId];
        uint256 debtId = group.nextDebtId++;
        group.debts[debtId] = Debt(_name, _debitor, _creditor, _amount, false);

        balances[_debitor][_groupId] -= int256(_amount);
        balances[_creditor][_groupId] += int256(_amount);

        emit DebtAdded(_groupId, debtId, _debitor, _creditor, _amount, _name);
    }

    function addExpense(uint256 _groupId, address[] memory _creditors, uint256[] memory _amounts, string memory _name) external onlyMember(_groupId) {
        require(_creditors.length == _amounts.length , "Lenghts do not match");
        for(uint32 i=0; i<_creditors.length; i++){
            _addDebt(_groupId, msg.sender, _creditors[i], _amounts[i], _name);
        }
    }
    }