# Splitwiser - Improving the Bill Split

## Background
 
In real world scenario, most people like to buy product or service together 
and choose to split the bill either uniformly or based on certain aspect. 
In web2 space, we already have Splitwise, an application that have been 
widely used in Germany. Several social platform, like WeChat and Line,
also integrates such feature to their application, which also gained positive
response from their users. Despite all of that, they face several shortcomings.

Despite its rebustness, Splitwise does not automatically track the status
of the shared bill. Users still have to manually input how much money they
transferred to settle their debt. Due to this limitation, Splitwise's user
adoption rate is very slow in other country. Bill splitting in 
WeChat and Line are also limited to user friends

 
## Project Overview
 
[Project Name] is a Web3 app designed to bridge the gap between traditional user experiences and the decentralized world. We prioritize simplicity, inclusivity, and real-world utility to empower users and foster a vibrant Web3 community.
 
## Key Features:
 
Gasless Transactions: Utilizing [specific gasless solution, e.g., Layer-2 network, rollup], we eliminate the financial barrier to entry, making Web3 accessible to everyone.
 
Cross-Chain Compatibility: Built on Base, our app is designed to seamlessly integrate with other blockchains, fostering interoperability and user choice.
 
Intuitive User Interface: We leverage best practices in design and UX to create a seamless and enjoyable experience for all users.
 
Integrated payments: Instead of relying on 3 parties and  manualy you can utilis the acount id for direct payments.

Integrated currency Conversion:  
Free alternative: to a web2 solution with a Web 3 backend twist.
 
# Addressing the Hackathon Challenges
 
## Base 2k: Best Consumer UX
 
We prioritize user experience through:
 
Clean and intuitive design: Our app interface is built with simplicity and user-friendliness in mind.
 
Guided onboarding: New users are seamlessly guided through the initial setup process.
 
Contextual help and support: Integrated documentation and support tools ensure users can easily find answers to their questions.
 
 
We're grateful to Scaffold Eth for providing the tools and resources that helped us achieve this focus on user experience.
 
## Circle 4k: Emerging Use Case
 
[Project Name] introduces a novel use case for Web3: [Clearly explain your emerging use case and its impact]. This innovative application leverages the power of blockchain technology to create [positive outcome or value proposition]. We're excited to explore this potential with Circle's support.
 
## Dynamics SocialFi 2k:
 
We integrate social features to foster a vibrant community within our app:
 
We encurage social intracions to hppen on chain. By creating an easier trip with your web3 andn non web 2.0 friend.
 
The Dynamics SocialFi framework has been instrumental in helping us implement these features and create a truly social Web3 experience.
 
## ENS Best Use Case:
 
We utilize ENS names to enhance user experience:
 
Personalized Identifiers: Users can search for their friends ENS names and verfy with the profil image the right wallet adress.
We Upgrade our user interface by desipalying their name s
Simplified Interactions: ENS names make it easier to connect and interact with other users, eliminating the need to memorize complex wallet addresses.
 
 
### Special Thanks to Circle, Scaffold Eth, and Dynamics for their support.
 
## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn ([v1](https://classic.yarnpkg.com/en/docs/install/) or [v2+](https://yarnpkg.com/getting-started/install))
- [Git](https://git-scm.com/downloads)

- You have to get a [Pimlico API key](https://dashboard.pimlico.io/sign-in) and put it in your env file (`NEXT_PUBLIC_PIMLICO_API_KEY`).

- You should send some ERC20 (USDC is better) to your Safe smart wallet in order to use the transfer and cross-chain transfer capabilities.

- You can use the default Dynamic environment ID to test, but we recommend you add your own as soon as possible in the env file (NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID)

## Quickstart

To get started with Scaffold-ETH 2 Hacker Edition, follow the steps below:

1. Clone this repo & install dependencies

```
git clone https://github.com/TUM-Blockchain-Club/splitwiser.git
cd packages
yarn install
```

2. Run a local network in the first terminal:

```
yarn chain
```

This command starts a local Ethereum network using Hardhat. The network runs on your local machine and can be used for testing and development. You can customize the network configuration in `hardhat.config.ts`.

3. On a second terminal, deploy the test contract:

```
yarn deploy
```

This command deploys a test smart contract to the local network. The contract is located in `packages/hardhat/contracts` and can be modified to suit your needs. The `yarn deploy` command uses the deploy script located in `packages/hardhat/deploy` to deploy the contract to the network. You can also customize the deploy script.

4. On a third terminal, start your NextJS app:

```
yarn start
```

Visit your app on: `http://localhost:3000`. You can interact with your smart contract using the `Debug Contracts` page. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.


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

## The code is under the Open source licence: GPL-3.0-or-later

## Further Documentation
- [Dynamic](https://docs.dynamic.xyz/)
- [Original Scaffold Eth 2](https://scaffold-eth-2-docs.vercel.app/)
- [Pimlico](https://docs.pimlico.io/)
- [Safe](https://docs.safe.global/)
- [Chainlink](https://docs.chain.link/)
- [Blockscout](https://docs.blockscout.com/for-users/api/rpc-endpoints)
