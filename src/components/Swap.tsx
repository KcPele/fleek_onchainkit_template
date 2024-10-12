import { Avatar, Name } from "@coinbase/onchainkit/identity";
import {
  Swap,
  SwapAmountInput,
  SwapToggleButton,
  SwapButton,
  SwapMessage,
  SwapToast,
  SwapSettings,
  SwapSettingsSlippageDescription,
  SwapSettingsSlippageInput,
  SwapSettingsSlippageTitle,
} from "@coinbase/onchainkit/swap";
import { Wallet, ConnectWallet } from "@coinbase/onchainkit/wallet";
import { useAccount, useAccount as useAccount2 } from "wagmi";
import type { Token } from "@coinbase/onchainkit/token";
import { useEffect, useState } from "react";
import axios from "axios";

async function fetchBaseTokens(): Promise<Token[]> {
  // Define a list of tokens available on Base mainnet
  const baseTokens = [
    { id: "ethereum", symbol: "ETH", name: "Ethereum" },
    { id: "usd-coin", symbol: "USDC", name: "USD Coin" },
    { id: "dai", symbol: "DAI", name: "Dai" },
    { id: "chainlink", symbol: "LINK", name: "Chainlink" },
    { id: "wrapped-bitcoin", symbol: "WBTC", name: "Wrapped Bitcoin" },
    { id: "uniswap", symbol: "UNI", name: "Uniswap" },
    { id: "compound-governance-token", symbol: "COMP", name: "Compound" },
    { id: "aave", symbol: "AAVE", name: "Aave" },
    { id: "balancer", symbol: "BAL", name: "Balancer" },
    { id: "curve-dao-token", symbol: "CRV", name: "Curve DAO Token" },
  ];

  try {
    const response = await axios.get(
      "https://api.coingecko.com/api/v3/coins/markets",
      {
        params: {
          vs_currency: "usd",
          order: "market_cap_desc",
          per_page: 250,
          page: 1,
          sparkline: false,
          ids: baseTokens.map(token => token.id).join(','),
        },
      }
    );

    const tokens: Token[] = response.data.map((token: any) => ({
      address: "", // You'll need to manually add these or use a different API
      chainId: 8453, // Base mainnet chain ID
      decimals: 18, // Assuming 18 decimals for most tokens, adjust if needed
      name: token.name,
      symbol: token.symbol.toUpperCase(),
      image: token.image,
    }));

    return tokens;
  } catch (error) {
    console.error("Error fetching tokens:", error);
    return [];
  }
}

export default function SwapComponents() {
  const { address } = useAccount();
  const [swappableTokens, setSwappableTokens] = useState<Token[]>([]);

  useEffect(() => {
    async function loadTokens() {
      const tokens = await fetchBaseTokens();
      setSwappableTokens(tokens);
    }
    loadTokens();
  }, []);

  const ETHToken: Token = {
    address: "",
    chainId: 8453,
    decimals: 18,
    name: "Ethereum",
    symbol: "ETH",
    image:
      "https://dynamic-assets.coinbase.com/dbb4b4983bde81309ddab83eb598358eb44375b930b94687ebe38bc22e52c3b2125258ffb8477a5ef22e33d6bd72e32a506c391caa13af64c00e46613c3e5806/asset_icons/4113b082d21cc5fab17fc8f2d19fb996165bcce635e6900f7fc2d57c4ef33ae9.png",
  };

  const USDCToken: Token = {
    address: "0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913",
    chainId: 8453,
    decimals: 6,
    name: "USDC",
    symbol: "USDC",
    image:
      "https://dynamic-assets.coinbase.com/3c15df5e2ac7d4abbe9499ed9335041f00c620f28e8de2f93474a9f432058742cdf4674bd43f309e69778a26969372310135be97eb183d91c492154176d455b8/asset_icons/9d67b728b6c8f457717154b3a35f9ddc702eae7e76c4684ee39302c4d7fd0bb8.png",
  };

  // add other tokens here to display them as options in the swap

  return address ? (
    <Swap isSponsored className="text-black">
      <SwapSettings>
        <SwapSettingsSlippageTitle>Max. slippage</SwapSettingsSlippageTitle>
        <SwapSettingsSlippageDescription>
          Your swap will revert if the prices change by more than the selected
          percentage.
        </SwapSettingsSlippageDescription>
        <SwapSettingsSlippageInput />
      </SwapSettings>
      <SwapAmountInput
        label="Sell"
        swappableTokens={swappableTokens}
        token={ETHToken}
        type="from"
      />
      <SwapToggleButton />
      <SwapAmountInput
        label="Buy"
        swappableTokens={swappableTokens}
        token={USDCToken}
        type="to"
      />
      <SwapButton />
      <SwapMessage />
      <SwapToast />
    </Swap>
  ) : (
    <Wallet>
      <ConnectWallet>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
    </Wallet>
  );
}
