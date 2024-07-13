// SPDX-License-Identifier: GPL-3.0-or-later
pragma solidity ^0.8.19;

contract Splitwiser {
    struct Debt {
        string name;
        address borrower;
        address lender;
        uint256 amount;
        bool paid;
    }

    struct Group {
        address[] members;
        mapping(uint256 => Debt) debts;
        uint256 nextDebtId;
    }

    struct PaymentToDo {
        address lender;
        uint256 amount;
    }

    mapping(string => Group) public groups;
    mapping(address => string[]) public pendingGroups;
    mapping(address => mapping(string => int256)) public balances; // address => groupName => balance
    mapping(address => mapping(string => PaymentToDo[])) public paymentstodo; // address => groupName => payments (lender + amt)

    event DebtAdded(string indexed groupName, uint256 indexed debtId, address indexed borrower, address lender, uint256 amount, string name);

    modifier onlyMember(string memory _groupName) {
        require(isMember(_groupName, msg.sender), "You are not a member of this group");
        _;
    }

    function acceptInvite(string memory _groupName) public {
        string[] storage groupss = pendingGroups[msg.sender];
        require(groupss.length > 0, "No pending invites");
        for(uint i = 0; i < groupss.length; i++) {
            if(keccak256(abi.encode(groupss[i])) == keccak256(abi.encode((_groupName)))){
                delete pendingGroups[msg.sender][i];
                groups[_groupName].members.push(msg.sender);
            }
        }
    }

    function createGroup(string memory _name, address[] memory _members) external {
        require(_members.length > 1, "Group must have at least 2 members");
        Group storage newGroup = groups[_name];
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
        for(uint i = 0; i < pendingGroups[_member].length; i++) {
            if (keccak256(bytes(pendingGroups[_member][i])) == keccak256(bytes(_groupName))) {
                return true;
            }
        }
        return false;
    }

    function inviteMember(string memory _groupName, address _invited) public onlyMember(_groupName) {
        require(!isPending(_groupName, _invited) && !isMember(_groupName, _invited), "Member is already in (pending) group");
        pendingGroups[_invited].push(_groupName);
    }

    function removeInvite(string memory _groupName, address _invited) public onlyMember(_groupName) {
        require(!isMember(_groupName, _invited), "Member is already in group");
        string[] storage invites = pendingGroups[_invited];
        for (uint i = 0; i < invites.length; i++) {
            if (keccak256(bytes(invites[i])) == keccak256(bytes(_groupName))) {
                invites[i] = invites[invites.length - 1];
                invites.pop();
                break;
            }
        }
    }

    function addDebt(string memory _groupName, address _lender, uint256 _amount, string memory _name) external onlyMember(_groupName) {
        require(_lender != msg.sender, "Cannot owe yourself");
        require(_amount > 0, "Amount must be positive");
        require(isMember(_groupName, _lender), "Lender must be a group member");

        _addDebt(_groupName, msg.sender, _lender, _amount, _name);
    }

    function _addDebt(string memory _groupName, address _borrower, address _lender, uint256 _amount, string memory _name) internal {
        Group storage group = groups[_groupName];
        uint256 debtId = group.nextDebtId++;
        group.debts[debtId] = Debt(_name, _borrower, _lender, _amount, false);

        balances[_borrower][_groupName] -= int256(_amount);
        balances[_lender][_groupName] += int256(_amount);

        emit DebtAdded(_groupName, debtId, _borrower, _lender, _amount, _name);
    }

    function addExpense(string memory _groupName, address[] memory _lenders, uint256[] memory _amounts, string memory _name) external onlyMember(_groupName) {
        require(_lenders.length == _amounts.length , "Lengths do not match");
        for(uint32 i=0; i<_lenders.length; i++){
            _addDebt(_groupName, msg.sender, _lenders[i], _amounts[i], _name);
        }
    }

    function findDebts(string memory _groupName, address _person) external onlyMember(_groupName) returns (PaymentToDo[] memory){
        return paymentstodo[_person][_groupName];
    }

    function payDebtsForGroup(string memory _groupName) external {
        //TODO USDC INTEGRATION
        PaymentToDo[]memory ptd = paymentstodo[msg.sender][_groupName];
        for(uint32 i=0; i<ptd.length;i++) {
            balances[msg.sender][_groupName] += int256(ptd[i].amount);
            balances[ptd[i].lender][_groupName] -= int256(ptd[i].amount);
        }
    }

    function settleGroupDebts(string memory _groupName) external onlyMember(_groupName) {
        Group storage group = groups[_groupName];
        address[] memory members = group.members;
        address[] memory borrowers = new address[](members.length);
        address[] memory lenders = new address[](members.length);
        uint256 borrowerCount = 0;
        uint256 lenderCount = 0;
        mapping(address => mapping(string => int256)) storage balances_temp = balances;

        // Separate borrowers and lenders
        for (uint256 i = 0; i < members.length; i++) {
            int256 balance = balances_temp[members[i]][_groupName];
            if (balance < 0) {
                borrowers[borrowerCount++] = members[i];
            } else if (balance > 0) {
                lenders[lenderCount++] = members[i];
            }
        }

        sortAddresses(borrowers, borrowerCount, _groupName, true);
        sortAddresses(lenders, lenderCount, _groupName, false);

        uint256 borrowerIndex = 0;
        uint256 lenderIndex = 0;
        while (borrowerIndex < borrowerCount && lenderIndex < lenderCount) {
            address borrower = borrowers[borrowerIndex];
            address lender = lenders[lenderIndex];
            uint256 amount = uint256(min(-int128(balances_temp[borrower][_groupName]), int128(balances_temp[lender][_groupName])));

            paymentstodo[borrower][_groupName].push(PaymentToDo(lender, amount));

            balances_temp[borrower][_groupName] += int256(amount);
            balances_temp[lender][_groupName] -= int256(amount);

            emit DebtSettled(_groupName, borrower, lender, amount);

            if (balances_temp[borrower][_groupName] == 0) borrowerIndex++;
            if (balances_temp[lender][_groupName] == 0) lenderIndex++;
        }
    }

    function sortAddresses(address[] memory arr, uint256 count, string memory _groupName, bool isBorrowers) internal view {
        for (uint256 i = 0; i < count - 1; i++) {
            for (uint256 j = 0; j < count - i - 1; j++) {
                if (isBorrowers) {
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

    event DebtSettled(string indexed groupName, address indexed borrower, address indexed lender, uint256 amount);
}
