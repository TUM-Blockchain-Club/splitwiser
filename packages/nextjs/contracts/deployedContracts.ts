/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    Splitwiser: {
      address: "0x9fE46736679d2D9a65F0992F2272dE9f3c7fa6e0",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "groupId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "debtId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "debtor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "creditor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          name: "DebtAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "groupId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "debtor",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "creditor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "DebtSettled",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
          ],
          name: "acceptInvite",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_creditor",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
          ],
          name: "addDebt",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address[]",
              name: "_creditors",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "_amounts",
              type: "uint256[]",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
          ],
          name: "addExpense",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "balances",
          outputs: [
            {
              internalType: "int256",
              name: "",
              type: "int256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "address[]",
              name: "_members",
              type: "address[]",
            },
          ],
          name: "createGroup",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_person",
              type: "address",
            },
          ],
          name: "findDebts",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "creditor",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              internalType: "struct Splitwiser.PaymentToDo[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "groups",
          outputs: [
            {
              internalType: "string",
              name: "groupName",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "nextDebtId",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_invited",
              type: "address",
            },
          ],
          name: "inviteMember",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
          ],
          name: "payDebtsForGroup",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "pendingGroupInvites",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_invited",
              type: "address",
            },
          ],
          name: "removeInvite",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
          ],
          name: "settleGroupDebts",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    YourContract: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "greetingSetter",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "newGreeting",
              type: "string",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "premium",
              type: "bool",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "GreetingChange",
          type: "event",
        },
        {
          inputs: [],
          name: "greeting",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "premium",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_newGreeting",
              type: "string",
            },
          ],
          name: "setGreeting",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "totalCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "userGreetingCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {},
    },
  },
  84532: {
    Splitwiser: {
      address: "0xAc4c911247F38b5520cb1e5FDE5aF60d2A593482",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "groupId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "debtId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "debtor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "creditor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          name: "DebtAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "groupId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "debtor",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "creditor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "DebtSettled",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
          ],
          name: "acceptInvite",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_creditor",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
          ],
          name: "addDebt",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address[]",
              name: "_creditors",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "_amounts",
              type: "uint256[]",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
          ],
          name: "addExpense",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "balances",
          outputs: [
            {
              internalType: "int256",
              name: "",
              type: "int256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "address[]",
              name: "_members",
              type: "address[]",
            },
          ],
          name: "createGroup",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_person",
              type: "address",
            },
          ],
          name: "findDebts",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "creditor",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              internalType: "struct Splitwiser.PaymentToDo[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "groups",
          outputs: [
            {
              internalType: "string",
              name: "groupName",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "nextDebtId",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_invited",
              type: "address",
            },
          ],
          name: "inviteMember",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
          ],
          name: "payDebtsForGroup",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "pendingGroupInvites",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_invited",
              type: "address",
            },
          ],
          name: "removeInvite",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
          ],
          name: "settleGroupDebts",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
    YourContract: {
      address: "0xDa5938Ea75bcE2BD5C117997e6BF570B3eBfe337",
      abi: [
        {
          inputs: [
            {
              internalType: "address",
              name: "_owner",
              type: "address",
            },
          ],
          stateMutability: "nonpayable",
          type: "constructor",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "address",
              name: "greetingSetter",
              type: "address",
            },
            {
              indexed: false,
              internalType: "string",
              name: "newGreeting",
              type: "string",
            },
            {
              indexed: false,
              internalType: "bool",
              name: "premium",
              type: "bool",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "value",
              type: "uint256",
            },
          ],
          name: "GreetingChange",
          type: "event",
        },
        {
          inputs: [],
          name: "greeting",
          outputs: [
            {
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "owner",
          outputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "premium",
          outputs: [
            {
              internalType: "bool",
              name: "",
              type: "bool",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_newGreeting",
              type: "string",
            },
          ],
          name: "setGreeting",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
        {
          inputs: [],
          name: "totalCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
          ],
          name: "userGreetingCounter",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [],
          name: "withdraw",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          stateMutability: "payable",
          type: "receive",
        },
      ],
      inheritedFunctions: {},
    },
  },
  11155111: {
    Splitwiser: {
      address: "0x6Ce28A0238f34D103eCB4AE5e54b0fe648E55E53",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "groupId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "uint256",
              name: "debtId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "debtor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "address",
              name: "creditor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
            {
              indexed: false,
              internalType: "string",
              name: "name",
              type: "string",
            },
          ],
          name: "DebtAdded",
          type: "event",
        },
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "uint256",
              name: "groupId",
              type: "uint256",
            },
            {
              indexed: true,
              internalType: "address",
              name: "debtor",
              type: "address",
            },
            {
              indexed: true,
              internalType: "address",
              name: "creditor",
              type: "address",
            },
            {
              indexed: false,
              internalType: "uint256",
              name: "amount",
              type: "uint256",
            },
          ],
          name: "DebtSettled",
          type: "event",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
          ],
          name: "acceptInvite",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_creditor",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "_amount",
              type: "uint256",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
          ],
          name: "addDebt",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address[]",
              name: "_creditors",
              type: "address[]",
            },
            {
              internalType: "uint256[]",
              name: "_amounts",
              type: "uint256[]",
            },
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
          ],
          name: "addExpense",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "balances",
          outputs: [
            {
              internalType: "int256",
              name: "",
              type: "int256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_name",
              type: "string",
            },
            {
              internalType: "address[]",
              name: "_members",
              type: "address[]",
            },
          ],
          name: "createGroup",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_person",
              type: "address",
            },
          ],
          name: "findDebts",
          outputs: [
            {
              components: [
                {
                  internalType: "address",
                  name: "creditor",
                  type: "address",
                },
                {
                  internalType: "uint256",
                  name: "amount",
                  type: "uint256",
                },
              ],
              internalType: "struct Splitwiser.PaymentToDo[]",
              name: "",
              type: "tuple[]",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "groups",
          outputs: [
            {
              internalType: "string",
              name: "groupName",
              type: "string",
            },
            {
              internalType: "uint256",
              name: "nextDebtId",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_invited",
              type: "address",
            },
          ],
          name: "inviteMember",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
          ],
          name: "payDebtsForGroup",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "address",
              name: "",
              type: "address",
            },
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          name: "pendingGroupInvites",
          outputs: [
            {
              internalType: "uint256",
              name: "",
              type: "uint256",
            },
          ],
          stateMutability: "view",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
            {
              internalType: "address",
              name: "_invited",
              type: "address",
            },
          ],
          name: "removeInvite",
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "uint256",
              name: "_groupId",
              type: "uint256",
            },
          ],
          name: "settleGroupDebts",
          outputs: [],
          stateMutability: "payable",
          type: "function",
        },
      ],
      inheritedFunctions: {},
    },
  },
} as const;

export default deployedContracts satisfies GenericContractsDeclaration;
