import { http, createConfig } from "wagmi";
import { baseSepolia } from "wagmi/chains";
import { coinbaseWallet } from "wagmi/connectors";

export const wagmiConfig = createConfig({
  chains: [baseSepolia],
  multiInjectedProviderDiscovery: false,
  connectors: [
    coinbaseWallet({
      appName: "Template",
      preference: "all", // set this to `all` to use EOAs as well
      version: "4",
    }),
  ],
  ssr: true,
  transports: {
    [baseSepolia.id]: http(
      "https://api.developer.coinbase.com/rpc/v1/base-sepolia/M38cgIFQVu6ldPK0gob81k2_LblbB3jq"
    ),
  },
});
