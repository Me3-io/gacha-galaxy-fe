import { createWeb3Modal, defaultConfig } from "@web3modal/ethers/react";

// 1. Your WalletConnect Cloud project ID
const projectId = process.env.REACT_APP_WC_PROJECTID || "0bf5a14a7c91721595b01bd4f92f2cf2";

// 2. Set chains
const mainnet = {
  chainId: 11_155_111,
  name: "Sepolia",
  currency: "ETH",
  explorerUrl: "https://sepolia.etherscan.io",
  rpcUrl: "https://rpc.sepolia.org",
};

// 3. Create a metadata object
const metadata = {
  name: process.env.REACT_APP_WC_PROJECTNAME || "Gacha Galaxy",
  description: "Web3Modal",
  url: process.env.REACT_APP_URL || "https://gachagalaxy.com",
  icons: ["https://avatars.githubusercontent.com/u/37784886"],
};

// 4. Create Ethers config
const ethersConfig = defaultConfig({
  /*Required*/
  metadata,

  /*Optional*/
  //enableEIP6963: true, // true by default
  //enableInjected: true, // true by default
  //enableCoinbase: true, // true by default
  //rpcUrl: "...", // used for the Coinbase SDK
  //defaultChainId: 1, // used for the Coinbase SDK
  auth: {
    email: true,
    socials: ["google", "x"],
    showWallets: true,
    walletFeatures: true,
  },
});

// 5. Create a Web3Modal instance
createWeb3Modal({
  ethersConfig,
  chains: [mainnet],
  projectId,
  enableAnalytics: false, // Optional - defaults to your Cloud configuration
  themeMode: "dark",
  themeVariables: {
    "--w3m-font-family": "ChakraPetch",
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
  return children
}
