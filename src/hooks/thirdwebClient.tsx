import { createThirdwebClient } from "thirdweb";

const clientId = process.env.REACT_APP_CLIENT_ID || "0903d0438bd5e33ad92413a0bc5cb21e";

export const client = createThirdwebClient({
  clientId,
});
