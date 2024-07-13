/**
 * This file is autogenerated by Scaffold-ETH.
 * You should not edit it manually or your changes might be overwritten.
 */
import { GenericContractsDeclaration } from "~~/utils/scaffold-eth/contract";

const deployedContracts = {
  31337: {
    Splitwiser: {
      address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
      abi: [
        {
          anonymous: false,
          inputs: [
            {
              indexed: true,
              internalType: "string",
              name: "groupName",
              type: "string",
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
              internalType: "string",
              name: "groupName",
              type: "string",
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
              internalType: "string",
              name: "_groupName",
              type: "string",
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
              internalType: "string",
              name: "_groupName",
              type: "string",
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
              internalType: "string",
              name: "_groupName",
              type: "string",
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
              internalType: "string",
              name: "",
              type: "string",
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
          outputs: [],
          stateMutability: "nonpayable",
          type: "function",
        },
        {
          inputs: [
            {
              internalType: "string",
              name: "_groupName",
              type: "string",
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
              internalType: "string",
              name: "",
              type: "string",
            },
          ],
          name: "groups",
          outputs: [
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
              internalType: "string",
              name: "_groupName",
              type: "string",
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
              internalType: "string",
              name: "_groupName",
              type: "string",
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
          name: "pendingGroups",
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
          inputs: [
            {
              internalType: "string",
              name: "_groupName",
              type: "string",
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
              internalType: "string",
              name: "_groupName",
              type: "string",
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
