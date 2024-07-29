import { createThirdwebClient } from "thirdweb";
import { createWallet, inAppWallet, walletConnect } from "thirdweb/wallets";

const clientId = process.env.REACT_APP_CLIENT_ID || "0903d0438bd5e33ad92413a0bc5cb21e";

export const client = createThirdwebClient({
  clientId,
});

export const wallets = [
  inAppWallet({
    auth: {
      options: ["email", "google"],
    },
  }),
  //createWallet("com.okex.wallet"),
  //createWallet("com.trustwallet.app"),
  //createWallet("global.safe"),
  //createWallet("com.coinbase.wallet"),
  walletConnect(),
];
