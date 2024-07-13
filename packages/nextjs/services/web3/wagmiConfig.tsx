import { getOrMapViemChain } from "@dynamic-labs/viem-utils";
import { Chain, createClient, http } from "viem";
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  hardhat,
  mainnet,
  polygon,
  polygonAmoy,
  scroll,
  scrollSepolia,
  sepolia,
} from "viem/chains";
import { createConfig } from "wagmi";
import { customEvmNetworks } from "~~/lib/networks";
import scaffoldConfig from "~~/scaffold.config";
import { getAlchemyHttpUrl } from "~~/utils/scaffold-eth";

// Overwrite several chains information
const baseWithBlockscout = {
  ...base,
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://base.blockscout.com",
      apiUrl: "https://base.blockscout.com/api",
    },
  },
};

const baseSepoliaWithBlockscout = {
  ...baseSepolia,
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://base-sepolia.blockscout.com",
      apiUrl: "https://base-sepolia.blockscout.com/api",
    },
  },
};

const mainnetWithBlockscout = {
  ...mainnet,
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://eth.blockscout.com",
      apiUrl: "https://eth.blockscout.com/api",
    },
  },
};

const sepoliaWithBlockscout = {
  ...sepolia,
  blockExplorers: {
    default: {
      name: "Blockscout",
      url: "https://eth-sepolia.blockscout.com",
      apiUrl: "https://eth-sepolia.blockscout.com/api",
    },
  },
};

export const wagmiConfig = createConfig({
  chains: [
    arbitrum,
    arbitrumSepolia,
    baseWithBlockscout,
    baseSepoliaWithBlockscout,
    mainnetWithBlockscout,
    polygon,
    polygonAmoy,
    scroll,
    scrollSepolia,
    sepoliaWithBlockscout,
    hardhat,
    ...customEvmNetworks.map(getOrMapViemChain),
  ],
  ssr: true,
  client({ chain }) {
    return createClient({
      chain,
      transport: http(getAlchemyHttpUrl(chain.id)),
      ...(chain.id !== (hardhat as Chain).id
        ? {
            pollingInterval: scaffoldConfig.pollingInterval,
          }
        : {}),
    });
  },
});
