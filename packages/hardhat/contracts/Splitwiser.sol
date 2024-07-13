// SPDX-License-Identifier: GPL-3.0
pragma solidity ^0.8.0;

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
    }

    // (Optimization) Data structure to keep track of what a person owe and
    // in what group.
    struct PaymentToDo {
        address creditor;
        uint256 amount;
    }

    uint256 private nextGroupId = 1; // Keep track of the next groupId
    mapping(uint256 => Group) public groups;
    mapping(address => uint256[]) public pendingGroupInvites; // Database of pending user invitations to a group(s)

    // (Pull-payment pattern) A mapping address => groupId => balance
    // to keep track of user balance in smart contract
    mapping(address => mapping(uint256 => int256)) public balances;

    // (Optimization) A mapping of address => groupId => payments ( creditor + amt )
    // to keep track of what a person owe and in what group. Faster and cheaper than iterating all groups.
    mapping(address => mapping(uint256 => PaymentToDo[])) private paymentsToDo;

    // Event to notify users if a new debt is added
    event DebtAdded(uint256 indexed groupId, uint256 indexed debtId, address indexed debtor, address creditor, uint256 amount, string name);

    modifier onlyMember(uint256 _groupId) {
        require(isMember(_groupId, msg.sender), "You are not a member of this group");
        _;
    }

    function acceptInvite(uint256 _groupId) public {
        uint256[] storage invitations = pendingGroupInvites[msg.sender];
        require(invitations.length > 0, "No pending invites");
        for(uint i = 0; i < invitations.length; i++) {
            if(invitations[i] == _groupId){
                delete pendingGroupInvites[msg.sender][i];
                groups[_groupId].members.push(msg.sender);
            }
        }
    }

    function createGroup(string memory _name, address[] memory _members) external returns (uint256) {
        uint256 currentGroupId = nextGroupId;
        Group storage newGroup = groups[currentGroupId];
        nextGroupId = nextGroupId + 1;
        newGroup.groupName = _name;
        newGroup.members = _members;
        newGroup.nextDebtId = 1;
        return currentGroupId;
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

    function addDebt(uint256 _groupId, address _creditor, uint256 _amount, string memory _name) external onlyMember(_groupId) {
        require(_creditor != msg.sender, "Cannot owe yourself");
        require(_amount > 0, "Amount must be positive");
        require(isMember(_groupId, _creditor), "Creditor must be a group member");

        _addDebt(_groupId, msg.sender, _creditor, _amount, _name);
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

    function findDebts(uint256 _groupId, address _person) external view onlyMember(_groupId) returns (PaymentToDo[] memory){
        return paymentsToDo[_person][_groupId];
    }

    function payDebtsForGroup(uint256 _groupId) external {
        //TODO USDC INTEGRATION
        PaymentToDo[]memory ptd = paymentsToDo[msg.sender][_groupId];
        for(uint32 i=0; i<ptd.length;i++) {
            balances[msg.sender][_groupId] += int256(ptd[i].amount);
            balances[ptd[i].creditor][_groupId] -= int256(ptd[i].amount);
        }
    }

    function settleGroupDebts(uint256 _groupId) payable external onlyMember(_groupId) {
        Group storage group = groups[_groupId];
        address[] memory members = group.members;
        address[] memory debtors = new address[](members.length);
        address[] memory creditors = new address[](members.length);
        uint256 debtorCount = 0;
        uint256 creditorCount = 0;
        mapping(address => mapping(uint256 => int256)) storage balances_temp = balances;

        // Separate debtors and creditors
        for (uint256 i = 0; i < members.length; i++) {
            int256 balance = balances_temp[members[i]][_groupId];
            if (balance < 0) {
                debtors[debtorCount++] = members[i];
            } else if (balance > 0) {
                creditors[creditorCount++] = members[i];
            }
        }

        sortAddresses(debtors, debtorCount, _groupId, true);
        sortAddresses(creditors, creditorCount, _groupId, false);

        uint256 debtorIndex = 0;
        uint256 creditorIndex = 0;
        while (debtorIndex < debtorCount && creditorIndex < creditorCount) {
            address debtor = debtors[debtorIndex];
            address creditor = creditors[creditorIndex];
            uint256 amount = uint256(min(-int128(balances_temp[debtor][_groupId]), int128(balances_temp[creditor][_groupId])));

            paymentsToDo[debtor][_groupId].push(PaymentToDo(creditor, amount));

            balances_temp[debtor][_groupId] += int256(amount);
            balances_temp[creditor][_groupId] -= int256(amount);

            emit DebtSettled(_groupId, debtor, creditor, amount);

            if (balances_temp[debtor][_groupId] == 0) debtorIndex++;
            if (balances_temp[creditor][_groupId] == 0) creditorIndex++;

        }
    }

    function sortAddresses(address[] memory arr, uint256 count, uint256 _groupId, bool isDebtors) internal view {
        for (uint256 i = 0; i < count - 1; i++) {
            for (uint256 j = 0; j < count - i - 1; j++) {
                if (isDebtors) {
                    if (balances[arr[j]][_groupId] > balances[arr[j + 1]][_groupId]) {
                        (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                    }
                } else {
                    if (balances[arr[j]][_groupId] < balances[arr[j + 1]][_groupId]) {
                        (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                    }
                }
            }
        }
    }

    function min(int256 a, int256 b) internal pure returns (int256) {
        return a < b ? a : b;
    }

    event DebtSettled(uint256 indexed groupId, address indexed debtor, address indexed creditor, uint256 amount);
}
