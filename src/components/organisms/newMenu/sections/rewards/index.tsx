import { Box, Grid, TableCell, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

import Button from "components/atoms/buttons/base";

import { getClaims } from "reduxConfig/thunks/claim";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";
import { useSelector } from "react-redux";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";

// items ----
import RewardDefault from "./items/default";
import RewardNFTs from "./items/nfts";
import RewardLazy from "./items/lazy";

const REWARD_TYPE = { CODE: "Codes", NFT: "NFTs", LAZY: "Lazy" };

const MainTable = () => {
  const claimeables = useSelector(getClaims)?.claimeables || [];
  const leaderboard = useSelector(getLeaderboard);

  const walletActive = leaderboard?.wallets.find((w: any) => w?.active && !w.social) || {};
  const isCrytoUser = walletActive?.type !== "me3-created" ? true : false;

  const getItemForType = (item: any) => {
    switch (item?.rewardType) {
      case REWARD_TYPE.NFT:
        return <RewardNFTs item={item} isCrytoUser={isCrytoUser} />;
      case REWARD_TYPE.LAZY:
        return <RewardLazy item={item} walletActive={walletActive} isCrytoUser={isCrytoUser} />;
      default:
        return <RewardDefault item={item} />;
    }
  };

  return (
    <TableContainer className={styled.table}>
      <Table>
        <TableBody>
          {claimeables.length > 0 ? (
            claimeables?.map((item: any, pos: number) => (
              <TableRow key={pos} className={styled.earnRow}>
                <TableCell>{getItemForType(item)}</TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>
                <span>no rewards available</span>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

const Rewards = ({ setOpen, setOpenCheckout }: any) => {
  const { t } = useTranslation();

  return (
    <Grid container flexDirection="column" className={styled.main} pb={2}>
      <Box className={styled.header}>
        <Box display={"flex"} gap={"1rem"}>
          <Button onClick={() => setOpen(false)}>
            <ArrowBackIcon /> {t("back")}
          </Button>
          {/*isCrytoUser && (
              <Button onClick={() => setOpenCheckout(true)}>
                <WalletIcon /> Buy Gas
              </Button>
            )*/}
        </Box>
        <Typography pb={2} className={styled.title}>
          {t("rewards").toUpperCase()}
        </Typography>
      </Box>
      <Box className={styled.container}>
        <MainTable />
      </Box>
    </Grid>
  );
};

export default Rewards;
