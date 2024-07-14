import { createConfig, http } from "@wagmi/core";
import { baseSepolia, mainnet } from "@wagmi/core/chains";

export const config = createConfig({
  chains: [mainnet, baseSepolia],
  transports: {
    [mainnet.id]: http(),
    [baseSepolia.id]: http(),
  },
});
