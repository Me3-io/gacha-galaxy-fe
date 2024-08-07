import { createThirdwebClient } from "thirdweb";
import { inAppWallet, createWallet, walletConnect } from "thirdweb/wallets";
import { sepolia, bsc } from "thirdweb/chains";
import { darkTheme } from "thirdweb/react";

// theme ---
export const theme = darkTheme({
  colors: {
    modalOverlayBg: "#00000040",
    modalBg: "#000000dd",
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
  inAppWallet({ auth: { options: ["email", "google"] } }),
  // @ts-ignore
  createWallet("com.okex.wallet"),
  // @ts-ignore
  createWallet("io.metamask"),
  // @ts-ignore
  createWallet("com.trustwallet.app"),
  // @ts-ignore
  createWallet("global.safe"),
  walletConnect(),
];

// client ---
const clientId = process.env.REACT_APP_CLIENT_ID || "0903d0438bd5e33ad92413a0bc5cb21e";
export const client = createThirdwebClient({
  clientId,
});


// modal config ---
export const modalConfig = { client, wallets, appMetadata, theme, chain };
