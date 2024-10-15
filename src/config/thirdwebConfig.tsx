import { createThirdwebClient } from "thirdweb";
import { inAppWallet, createWallet, walletConnect } from "thirdweb/wallets";
import { sepolia, bsc } from "thirdweb/chains";
import { darkTheme } from "thirdweb/react";

// theme ---
export const theme = darkTheme({
  colors: {
    modalOverlayBg: "#00000040",
    modalBg: "#000000cc",
    borderColor: "#ba00fb",
  },
  fontFamily: "ChakraPetchLight",
});

// chains ---
export const chain = process.env.REACT_APP_CHAIN === "bsc" ? bsc : sepolia;

// app metadata ---
export const appMetadata = {
  name: "Gacha Galaxy",
  description: "Gacha Galaxy",
  url: process.env.REACT_APP_URL || "https://gachagalaxy.me3.io",
  icons: ["https://gachagalaxy.me3.io/favicon.ico"],
};

// wallets ---
export const wallets = [
  inAppWallet({ auth: { options: ["email", "google", "telegram", "line", "passkey"] } }),
  // @ts-ignore
  createWallet("io.metamask"),
  // @ts-ignore
  createWallet("com.binance"),
  // @ts-ignore
  createWallet("com.okex.wallet"),
  // @ts-ignore
  createWallet("com.bitget.web3"),
  // @ts-ignore
  createWallet("net.gateweb3"),
  walletConnect(),
];

const onlyWallets = [
  // @ts-ignore
  createWallet("io.metamask"),
  // @ts-ignore
  createWallet("com.okex.wallet"),
  // @ts-ignore
  createWallet("com.bitget.web3"),
  // @ts-ignore
  createWallet("net.gateweb3"),
  walletConnect(),
];

const onlySocial = [inAppWallet({ auth: { options: ["google", "telegram"] } })];

// client ---
const clientId = process.env.REACT_APP_CLIENT_ID || "";
export const client = createThirdwebClient({
  clientId,
});

// hide thirdweb branding ---
const showThirdwebBranding = false;

// modal config ---
export const modalConfig = { client, wallets, appMetadata, theme, chain, showThirdwebBranding };
export const onlyWalletConfig = { client, wallets: onlyWallets, appMetadata, theme, chain, showThirdwebBranding };
export const onlySocialConfig = { client, wallets: onlySocial, appMetadata, theme, chain, showThirdwebBranding };
