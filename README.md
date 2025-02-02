# Splitwiser - Split your bills with Web3 power and Web2 ease

**Be one of the first users of Splitwiser. Happy to hear your feedback! https://splitwiser-phi.vercel.app/**

**Have a look at our pitch deck: https://pitch.com/v/splitwiser-bsv9bw**

**Have a look at the presentation video: https://www.youtube.com/watch?v=-nCnx27RPLQ**

[<img src="./planning/product-images/homepage.jpeg" width="250"/>](image.png)

# Table of Contents  
- [Background](#background)  
- [Splitwiser](#splitwiser-description)
    - [Key Features](#key-features)
    - [Used Tools](#used-tools)
- [Development](#development)
    - [Requirements](#equirements)
    - [Quick Start](#quick-start)
        - [Further Documentation on used tools](#further-documentation-on-used-tools)
- [Gallery and Workflow](#gallery-and-workflow)
- [Contacts](#contacts)
- [License](#license)


## Background
 
In real world scenario, most people like to buy product or service together and choose to split the bill either uniformly or based on certain aspect. 
In web2 space, there are already solutions like [Splitwise](https://www.splitwise.com/) and [Tricount](https://tricount.com/). Several social platform, like WeChat and Line, also integrates such feature to their application, which also gained positive
response from their users. 

Despite all of that, they face several shortcomings. Even with its rebustness, Splitwise or similar does not automatically track the status
of the shared bill. Users still have to manually input how much money they transferred to settle their debt. Due to this limitation, Splitwise's user adoption rate is very slow in some countries. Additionally, applications like Splitwise have introduced their paid plans, which limit the number of groups and expenses you can track for free. Moreover, these applications are filled with annoying ads.
 
## Description
 
Splitwiser a solution to tackle peer-to-peer bill-tracking issues in traditional applications. By leveraging the power of web3 while maintaining the familiar workflows of web2, Splitwiser aims to onboard a new generation of users seamlessly. The smart contracts managing these actions are currently deployed on Ethereum and Base chains but are designed to be cross-chain, with plans to support more in the future. Respecting the transparent nature of web3, we are verifying our smart contracts on the Blockscout Explorer. The native currency is EURC by Circle, with more cryptocurrencies to be supported without additional conversion costs.

In Splitwiser, users can authenticate with both web2 and web3 methods. Once authenticated using the Dynamic system, users can create a new group (e.g., for an event) and add other participants. To simplify adding users, Splitwiser allows direct adding via wallet address and leverages The Graph queries and ENS for easy friend searches. After forming the group, its members can add expenses until the trip ends or when they need to settle the bill. Our debt simplification algorithm minimizes the number of transactions required by recursively matching the biggest debtors and creditors. 

All the interactions with the smart contract until the actual debt settlement are free for the users because of the Safe Smart Wallet feature. This feature sets Splitwiser apart from current web2 solutions, as it allows for infinite groups, members, and expenses without any charges, thanks to gas sponsorship by the application. The modern and familiar interface ensures that even common users can use our application without encountering any web3 complexity.

Splitwiser introduces direct on-chain payments within the app to finalize settlements. The smart contract handles the deposits and withdrawals, so users either need to supply their sum debt into the smart contract or wait until the smart contract pays out the promised debt.

Splitwiser's goal is not just to replicate a web2 app on-chain but to demonstrate how a proper UI/UX, account abstraction, gas fee subsidy, and other tools can create applications that leverage web3's potential while maintaining the ease of use of web2 apps. The Splitwiser team, former active users of the Splitwise web2 application, is now switching to their solution. They aim for this project to be widely used, not just another hackathon project.
 
### Key Features

**Integrated payments:** Aftet debt is calculated, the debtors have to transfer the debt into smart contracts which will then automatically redistribute the money to creditors.

**Barrier-free login:**  The app supports common web2 logins such as email and Google SSO as well as wallet login
 
**Gasless Transactions:** Utilizing Safe smart wallets, we shift responsibility of gas fee payment to developer and, so, eliminate the financial barrier to entry, making Web3 accessible to everyone.
 
**Cross-Chain Compatibility**: Built on Base, our app is designed to seamlessly integrate with other blockchains, fostering interoperability and user choice.
 
**Intuitive User Interface:** We leverage best practices in design and UX to create a seamless and enjoyable experience for all users.

### Used Tools

**Backend and Frontend:** [Scaffold-ETH 2](https://scaffoldeth.io/) (NextJs14 and Hardhat)

**Smart contracts:** [Solidity](https://soliditylang.org/)

**Login:** [Dynamic](https://www.dynamic.xyz/)

**Sponsored transactions & wallets:** [Safe smart wallets](https://safe.global/)

**Usernames:** [ENS](https://ens.domains/)

**User search:** [The Graph](https://thegraph.com/) with ENS

**Chains deployed:** Sepolia Ethereum and Sepolia [Base](https://www.base.org/)

**Native currency:** [EURC](https://www.circle.com/en/eurc)

# Development 

Deployed Smart Contracts on
- Ethereum Sepolia: [0xAc4c911247F38b5520cb1e5FDE5aF60d2A593482](https://eth-sepolia.blockscout.com/address/0xAc4c911247F38b5520cb1e5FDE5aF60d2A593482)
- Base Sepolia: [0xfbd0E05993B19523a4C823EdA80C897999654110](https://base-sepolia.blockscout.com/address/0xfbd0E05993B19523a4C823EdA80C897999654110)

## Requirements

Before you begin, you need to install the following tools:

- [Node (>= v18.17)](https://nodejs.org/en/download/)
- Yarn [v2+](https://yarnpkg.com/getting-started/install)
- [Git](https://git-scm.com/downloads)

- You have to get a [Pimlico API key](https://dashboard.pimlico.io/sign-in) and put it in your env file (`NEXT_PUBLIC_PIMLICO_API_KEY`).

- You should send some ERC20 (USDC is better) to your Safe smart wallet in order to use the transfer and cross-chain transfer capabilities.

- You can use the default Dynamic environment ID to test, but we recommend you add your own as soon as possible in the env file (NEXT_PUBLIC_DYNAMIC_ENVIRONMENT_ID)

## Quickstart

To get started with Scaffold-ETH 2 Hacker Edition, follow the steps below:

1. Clone this repo & install dependencies

```bash
git clone https://github.com/TUM-Blockchain-Club/splitwiser.git
cd splitwiser
yarn install
```

2. Deploy the smart contract on Ethereum Sepolia and Base Sepolia

```bash
yarn deploy --network baseSepolia
yarn deploy --network sepolia
```

These commands deploy our smart contracts to Ethereum Sepolia and Base Sepolia accordingly. 
You can also set your own network by changing the `--network` argument.
These commands will also set the `scaffold-eth2` project configuration with the ABI, smart contract
addresses, and others. They are very relevant for the next phases of the development.

3. Verify the smart contracts

```bash
yarn verify --network baseSepolia --api-url https://base-sepolia.blockscout.com/api
yarn verify --network sepolia --api-url https://eth-sepolia.blockscout.com/api
```

Verifying smart contracts on the Blockscout helps in debugging the smart contract. It also acts as transparency layer
between you and your users. 

Note: The Ethereum network API might will return an error if the script is already verified while 
the Base network does not.

4. Lastly, start your NextJS app:

```bash
yarn start
```

Visit your app on: `http://localhost:3000`. You can tweak the app config in `packages/nextjs/scaffold.config.ts`.

For more detailed information on features and possibilities of Scaffold-ETH 2 please refer to [Scaffold-ETH 2 READMDE](./READ-scaffold.md).

### Further Documentation on used tools
- [Dynamic](https://docs.dynamic.xyz/)
- [Original Scaffold Eth 2](https://scaffold-eth-2-docs.vercel.app/)
- [Pimlico](https://docs.pimlico.io/)
- [Safe](https://docs.safe.global/)
- [Chainlink](https://docs.chain.link/)
- [Blockscout](https://docs.blockscout.com/for-users/api/rpc-endpoints)

## Gallery and Workflow
Lets go through the workflow one by one with some images for easier understanding:

### 1. Login to the APP

[<img src="./planning/product-images/login.jpg" width="250"/>](image.png)
[<img src="./planning/product-images/homepage.jpeg" width="250"/>](image.png)

### 2. Create a new group for an event/trip

[<img src="./planning/product-images/group-creation.jpeg" width="250"/>](image.png)
[<img src="./planning/product-images/group-created.jpeg" width="250"/>](image.png)

### 3. Add friend to a group
[<img src="./planning/product-images/ens-searching.jpeg" width="250"/>](image.png)

### 4. Add expenses
[<img src="./planning/product-images/expense-adding.jpeg" width="250"/>](image.png)

### 4. Settle debts
[<img src="./planning/product-images/debts-settling.jpeg" width="250"/>](image.png)


## Contacts
**Team:**
- @LUOJIUzxy
- @itsmeyaw
- @tsatsch
- @jescom9
- @dragoscodes

With Love from TUM Blockchain Club

**Built with ❤ by**

[<img src="./planning/tbc-logo.png" width="150"/>](image.png)
