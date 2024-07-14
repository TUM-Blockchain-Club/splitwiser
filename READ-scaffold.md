# Scaffold-ETH 2

## Features Overview

⚙️ Built using NextJS, Dynamic, Hardhat, Wagmi, Viem, and Typescript.

- ✅ **Contract Hot Reload**: Your frontend auto-adapts to your smart contract as you edit it.
- 🪝 **[Custom hooks](https://docs.scaffoldeth.io/hooks/)**: Collection of React hooks wrapper around [wagmi](https://wagmi.sh/) to simplify interactions with smart contracts with typescript autocompletion.
- 🧱 [**Components**](https://docs.scaffoldeth.io/components/): Collection of common web3 components to quickly build your frontend.
- 🔥 **Burner Wallet & Local Faucet**: Quickly test your application with a burner wallet and local faucet.

![Debug Contracts tab](https://github.com/scaffold-eth/scaffold-eth-2/assets/55535804/b237af0c-5027-4849-a5c1-2e31495cccb1)

- 🤝 **Dynamic onboarding**: Provides an interactive and responsive widget for interacting with your embedded wallet. You can create your embedded wallet using social logins or connecting an existing wallet.
- 🔥 **Safe Smart Wallet**: Provides the most battle-tested ERC-4337 compatible smart wallet, improving users' UX.
- 📱 **Permissionless.js (Pimlico) for gasless transactions**: Facilitates transactions without requiring users to pay gas fees. Pimlico is the world's most popular ERC-4337 account abstraction infrastructure platform.
- ⛓ **Chainlink CCIP for cross-chain transactions**: Enables seamless transfers across different blockchain networks.
- 🔗 **Blockscout for checking transactions**: Allows users to track and verify their transactions.

### Chains & Networks
Out of the box with the Dynamic implementation you get:

- Base
- Arbitrum
- Polygon
- Scroll
- Zircuit
- Rootstock
- ZERϴ
- Morph

You can add many more via [the dashboard](https://app.dynamic.xyz/dashboard/chains-and-networks), or using [custom EVM Networks](https://docs.dynamic.xyz/chains/evmNetwork)!

*This means you can instantly plug in any local chain you have running, like from Arbitrum Orbit, Polygon CDK etc!*

### Safe Smart Wallet and Permissionless.js (Pimlico)

Navigate to the "Smart Wallet" section and click on "Deploy Safe Account".
This action calls the `createSmartAccountClient` function from Permissionless.js. More details can be found [here](https://docs.pimlico.io/permissionless/how-to/signers/privy#create-the-smartaccountclient).
The Safe address is calculated deterministically based on your Dynamic embedded wallet address.
The actual deployment of the Safe wallet occurs when you initiate your first transaction, such as a transfer.

#### Executing a Transfer:
You can perform a transfer of ERC-20 tokens in a gasless way. The app uses `smartAccountClient.writeContract` from Permissionless.js ([source](https://docs.pimlico.io/permissionless/reference/smart-account-actions/writeContract)). This allows for gasless transfers, sponsored by the Pimlico Paymaster on testnets.
ERC-20 transfers are supported on any chain supported by Pimlico. Refer to the supported chains documentation [here](https://docs.pimlico.io/infra/bundler/bundler-errors/chain-not-supported#adding-new-chains).

### Chainlink CCIP for Cross-Chain Transactions

A custom Chainlink CCIP cross-chain transfer smart contract has been deployed, allowing for USDC (only!) transfers.
The contract has ETH on Base Sepolia to cover CCIP fees.
Contract address: `0x480A24B3F71f8704066211e61CF6CCE430B8a5c7`. You can find it in the `constants.ts` file of the project.
Check the contract code: you can find the code in `/hardhat/contracts/CCIPTransfer.sol`.
Check the contract ABI: you can find the contract ABI in `/nextjs/lib/ABI`.
The reference of the contract is this Chainlink CCIP contract example ([source](https://docs.chain.link/ccip/tutorials/cross-chain-tokens)).

The app uses `smartAccountClient.writeContract` ([source](https://docs.pimlico.io/permissionless/reference/smart-account-actions/writeContract)) of Permissionless.js to ensure gasless cross-chain transactions.
The implementation is flexible, allowing for easy extension to support additional chains or rewriting the contract.
If your allowance is lower than the amount to transfer, you are asked to execute an approve too.

### Blockscout for Checking Transactions

In the "Transactions" section, users can view all transactions executed by the Safe smart wallet within the session. The app integrates the [Blockscout API](https://docs.blockscout.com/for-users/api) to fetch and display transaction details, providing a transparent and user-friendly way to track activities.
