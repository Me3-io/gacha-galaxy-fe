import { Box, Grid, Typography } from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableRow from "@mui/material/TableRow";

// icons ---
import menu from "assets/icons/menu.svg";
import user from "assets/icons/user.svg";
import arrowUp from "assets/icons/arrowUp.svg";
import arrowDown from "assets/icons/arrowDown.svg";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import UpIcon from "@mui/icons-material/KeyboardDoubleArrowUp";

import styled from "../styled.module.scss";
import Button from "components/atoms/buttons/base";

const rows = [
  { id: 1, name: "UserGamer123", arrowUp: true, points: 487.5 },
  { id: 2, name: "PixelWarrior", arrowUp: false, points: 469.2 },
  { id: 3, name: "DragonSlayerX", arrowUp: true, points: 452.3 },
  { id: 4, name: "ShadowNinja", arrowUp: false, points: 436.5 },
  { id: 5, name: "CyberSamurai", arrowUp: true, points: 419.7 },
  { id: 6, name: "MysticMage", arrowUp: true, points: 487.5 },
  { id: 7, name: "GalacticHero", arrowUp: false, points: 469.2 },
  { id: 8, name: "StealthSniper", arrowUp: false, points: 452.3 },
  { id: 9, name: "EpicWizard", arrowUp: true, points: 436.5 },
  { id: 10, name: "VortexVoyager", arrowUp: false, points: 419.7 },
  { id: 11, name: "QuantumRider", arrowUp: false, points: 487.5 },
  { id: 12, name: "BlazePhoenix", arrowUp: false, points: 469.2 },
  { id: 13, name: "LunarKnight", arrowUp: true, points: 452.3 },
  { id: 14, name: "FrostGuardian", arrowUp: false, points: 436.5 },
  { id: 15, name: "StormHunter", arrowUp: true, points: 419.7 },
];

const Main = ({ showBack, goToMap, setOpenPoints, setOpenTokens, opacity }: any) => {
  return (
    <Grid
      container
      component="section"
      flexDirection="column"
      className={styled.main}
      sx={{ opacity: opacity }}
    >
      <Box p={2} className={styled.header}>
        <Box component="span">
          <img src={menu} alt="menu" width={36} />
        </Box>
        {showBack && (
          <Box className={styled.upIcon} onClick={goToMap}>
            <span>map</span>
            <UpIcon />
          </Box>
        )}
      </Box>

      <Box p={2} className={styled.container}>
        <Typography pb={2} className={styled.title}>
          LEADERBOARD
        </Typography>
        <Box className={styled.listData}>
          <Box className={styled.border}></Box>
          <TableContainer className={styled.table}>
            <Table>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.id}>
                    <TableCell className={styled.user} component="th" scope="row">
                      <img src={user} alt="user" />
                      <span>{row.id}</span>
                      {row.name}
                    </TableCell>
                    <TableCell align="right">
                      <img src={row.arrowUp ? arrowUp : arrowDown} alt="arrow" />
                    </TableCell>
                    <TableCell align="right">{row.points.toFixed(3)} pts</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Box>

      <Box px={4} py={2} className={styled.footer}>
        <Box className={styled.item} pr={2}>
          <span>Points</span>
          <Typography>125.000</Typography>
          <Button onClick={() => setOpenPoints(true)}>
            Earn Points <ArrowForwardIcon />
          </Button>
        </Box>
        <Box className={styled.item} pl={2}>
          <span>Tokens</span>
          <Typography>650</Typography>
          <Button onClick={() => setOpenTokens(true)}>
            Get Tokens <ArrowForwardIcon />
          </Button>
        </Box>
      </Box>
    </Grid>
  );
};
export default Main;