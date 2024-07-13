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
    mapping(address => string[]) public pendingGroupInvites; // Database of pending user invitations to a group(s)

    // (Pull-payment pattern) A mapping address => groupName => balance
    // to keep track of user balance in smart contract
    mapping(address => mapping(string => int256)) public balances;

    // (Optimization) A mapping of address => groupName => payments ( creditor + amt )
    // to keep track of what a person owe and in what group. Faster and cheaper than iterating all groups.
    mapping(address => mapping(string => PaymentToDo[])) private paymentsToDo;

    // Event to notify users if a new debt is added
    event DebtAdded(string indexed groupName, uint256 indexed debtId, address indexed debtor, address creditor, uint256 amount, string name);

    modifier onlyMember(string memory _groupName) {
        require(isMember(_groupName, msg.sender), "You are not a member of this group");
        _;
    }

    function acceptInvite(string memory _groupName) public {
        string[] storage invitations = pendingGroupInvites[msg.sender];
        require(invitations.length > 0, "No pending invites");
        for(uint i = 0; i < invitations.length; i++) {
            if(keccak256(abi.encode(invitations[i])) == keccak256(abi.encode((_groupName)))){
                delete pendingGroupInvites[msg.sender][i];
                groups[_groupName].members.push(msg.sender);
            }
        }
    }

    function createGroup(string memory _name, address[] memory _members) external {
        Group storage newGroup = groups[nextGroupId];
        nextGroupId = nextGroupId + 1;
        newGroup.groupName = _name;
        newGroup.members = _members;
        newGroup.nextDebtId = 1;
    }

    function isMember(string memory _groupName, address _member) internal view returns (bool) {
        address[] memory members = groups[_groupName].members;
        for (uint i = 0; i < members.length; i++) {
            if (members[i] == _member) {
                return true;
            }
        }
        return false;
    }

    function isPending(string memory _groupName, address _member) internal view returns (bool) {
        for(uint i = 0; i < pendingGroupInvites[_member].length; i++) {
            if (keccak256(bytes(pendingGroupInvites[_member][i])) == keccak256(bytes(_groupName))) {
                return true;
            }
        }
        return false;
    }

    function inviteMember(string memory _groupName, address _invited) public onlyMember(_groupName) {
        require(!isPending(_groupName, _invited) && !isMember(_groupName, _invited), "Member is already in (pending) group");
        pendingGroupInvites[_invited].push(_groupName);
    }

    function removeInvite(string memory _groupName, address _invited) public onlyMember(_groupName) {
        require(!isMember(_groupName, _invited), "Member is already in group");
        string[] storage invites = pendingGroupInvites[_invited];
        for (uint i = 0; i < invites.length; i++) {
            if (keccak256(bytes(invites[i])) == keccak256(bytes(_groupName))) {
                invites[i] = invites[invites.length - 1];
                invites.pop();
                break;
            }
        }
    }

    function addDebt(string memory _groupName, address _creditor, uint256 _amount, string memory _name) external onlyMember(_groupName) {
        require(_creditor != msg.sender, "Cannot owe yourself");
        require(_amount > 0, "Amount must be positive");
        require(isMember(_groupName, _creditor), "Creditor must be a group member");

        _addDebt(_groupName, msg.sender, _creditor, _amount, _name);
    }

    function _addDebt(string memory _groupName, address _debitor, address _creditor, uint256 _amount, string memory _name) internal {
        Group storage group = groups[_groupName];
        uint256 debtId = group.nextDebtId++;
        group.debts[debtId] = Debt(_name, _debitor, _creditor, _amount, false);

        balances[_debitor][_groupName] -= int256(_amount);
        balances[_creditor][_groupName] += int256(_amount);

        emit DebtAdded(_groupName, debtId, _debitor, _creditor, _amount, _name);
    }

    function addExpense(string memory _groupName, address[] memory _creditors, uint256[] memory _amounts, string memory _name) external onlyMember(_groupName) {
        require(_creditors.length == _amounts.length , "Lenghts do not match");
        for(uint32 i=0; i<_creditors.length; i++){
            _addDebt(_groupName, msg.sender, _creditors[i], _amounts[i], _name);
        }
    }

    function findDebts(string memory _groupName, address _person) external view onlyMember(_groupName) returns (PaymentToDo[] memory){
        return paymentsToDo[_person][_groupName];
    }

    function payDebtsForGroup(string memory _groupName) external {
        //TODO USDC INTEGRATION
        PaymentToDo[]memory ptd = paymentsToDo[msg.sender][_groupName];
        for(uint32 i=0; i<ptd.length;i++) {
            balances[msg.sender][_groupName] += int256(ptd[i].amount);
            balances[ptd[i].creditor][_groupName] -= int256(ptd[i].amount);
        }
    }

    function settleGroupDebts(string memory _groupName) payable external onlyMember(_groupName) {
        Group storage group = groups[_groupName];
        address[] memory members = group.members;
        address[] memory debtors = new address[](members.length);
        address[] memory creditors = new address[](members.length);
        uint256 debtorCount = 0;
        uint256 creditorCount = 0;
        mapping(address => mapping(string => int256)) storage balances_temp = balances;

        // Separate debtors and creditors
        for (uint256 i = 0; i < members.length; i++) {
            int256 balance = balances_temp[members[i]][_groupName];
            if (balance < 0) {
                debtors[debtorCount++] = members[i];
            } else if (balance > 0) {
                creditors[creditorCount++] = members[i];
            }
        }

        sortAddresses(debtors, debtorCount, _groupName, true);
        sortAddresses(creditors, creditorCount, _groupName, false);

        uint256 debtorIndex = 0;
        uint256 creditorIndex = 0;
        while (debtorIndex < debtorCount && creditorIndex < creditorCount) {
            address debtor = debtors[debtorIndex];
            address creditor = creditors[creditorIndex];
            uint256 amount = uint256(min(-int128(balances_temp[debtor][_groupName]), int128(balances_temp[creditor][_groupName])));

            paymentsToDo[debtor][_groupName].push(PaymentToDo(creditor, amount));

            balances_temp[debtor][_groupName] += int256(amount);
            balances_temp[creditor][_groupName] -= int256(amount);

            emit DebtSettled(_groupName, debtor, creditor, amount);

            if (balances_temp[debtor][_groupName] == 0) debtorIndex++;
            if (balances_temp[creditor][_groupName] == 0) creditorIndex++;

        }
    }

    function sortAddresses(address[] memory arr, uint256 count, string memory _groupName, bool isDebtors) internal view {
        for (uint256 i = 0; i < count - 1; i++) {
            for (uint256 j = 0; j < count - i - 1; j++) {
                if (isDebtors) {
                    if (balances[arr[j]][_groupName] > balances[arr[j + 1]][_groupName]) {
                        (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                    }
                } else {
                    if (balances[arr[j]][_groupName] < balances[arr[j + 1]][_groupName]) {
                        (arr[j], arr[j + 1]) = (arr[j + 1], arr[j]);
                    }
                }
            }
        }
    }

    function min(int256 a, int256 b) internal pure returns (int256) {
        return a < b ? a : b;
    }

    event DebtSettled(string indexed groupName, address indexed debtor, address indexed creditor, uint256 amount);
}
