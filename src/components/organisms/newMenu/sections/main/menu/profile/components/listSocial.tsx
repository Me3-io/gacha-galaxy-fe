import { Box } from "@mui/material";

import GoogleIcon from "@mui/icons-material/Google";
import TelegramIcon from "@mui/icons-material/Telegram";

import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

import styled from "../styled.module.scss";
import UnlinkTimmer from "./unlinkTimer";

const ListSocials = ({ unlinkWallet }: any) => {
  const data = useSelector(getLeaderboard);

  // validate on unlink social
  const hasUserOwned = data?.wallets.filter((w: any) => !w?.type || w?.type === "user-owned").length;
  const hasSocial = data?.wallets.filter((w: any) => w?.type === "third-party-created").length;
  const allowLinked = hasUserOwned > 0 || hasSocial > 1;

  // filter social wallets
  const wallets = data?.wallets.filter((w: any) => w?.social && w?.type !== "me3-wallet") || [];

  return (
    <>
      {wallets.length > 0 ? (
        wallets.map((row: any) => (
          <Box key={row.address} className={styled.rowWallet}>
            <Box>
              {row?.social === "google" && <GoogleIcon />}
              {row?.social === "telegram" && <TelegramIcon />}
              <span>{(row?.social || "social").toUpperCase()}</span>
            </Box>

            {allowLinked && (
              <Box>
                <UnlinkTimmer address={row.address} unlinkWallet={unlinkWallet} />
              </Box>
            )}
          </Box>
        ))
      ) : (
        <Box px={2}>
          <span>no social linked</span>
        </Box>
      )}
    </>
  );
};

export default ListSocials;
