import { createWeb3Modal } from "@web3modal/wagmi/react";
import { defaultWagmiConfig } from "@web3modal/wagmi/react/config";

import { WagmiProvider } from "wagmi";
import { arbitrum, mainnet } from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// 0. Setup queryClient
const queryClient = new QueryClient();

// 1. Set projectId
const projectId = process.env.REACT_APP_WC_PROJECTID || "0bf5a14a7c91721595b01bd4f92f2cf2";

// 2. Create wagmiConfig
const metadata = {
  name: process.env.REACT_APP_WC_PROJECTNAME || "Gacha Galaxy",
  description: "Web3Modal",
  url: process.env.REACT_APP_URL || "https://gachagalaxy.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

const chains = [mainnet, arbitrum] as const;
const config = defaultWagmiConfig({
  chains,
  projectId,
  metadata,
  auth: {
    email: true,
    socials: ["google", "x"],
    showWallets: true,
    walletFeatures: true,
  },
});

// 3. Create modal
createWeb3Modal({
  wagmiConfig: config,
  projectId,
  enableAnalytics: true,  // Optional - defaults to your Cloud configuration
  enableOnramp: true,     // Optional - false as default
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": "Orbitron",
    "--w3m-border-radius-master": "2px",
  },
  featuredWalletIds: [
    "971e689d0a5be527bac79629b4ee9b925e82208e5168b733496a09c0faed0709",
    "c57ca95b47569778a828d19178114f4db188b89b763c899ba0be274e97267d96",
    "4622a2b2d6af1c9844944291e5e7351a6aa24cd7b23099efac1b2fd875da31a0",
    "225affb176778569276e484e1b92637ad061b01e13a048b35a9d280c3b58970f",
  ],
});

export function Web3ModalProvider({ children }: any) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
}
