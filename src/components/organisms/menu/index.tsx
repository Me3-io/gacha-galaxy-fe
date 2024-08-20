import { Box } from "@mui/material";
import { useState } from "react";

import Leaderboard from "./sections/leaderboard";
import EarnPoints from "./sections/earnPoints";
import GetTokens from "./sections/getTokens";
import Menu from "./sections/menu";

import styled from "./styled.module.scss";
import ClaimAll from "./sections/claimAll";
import Notifications from "./sections/notifications";
import Profile from "./sections/profile";
import Settings from "./sections/settings";

const Submenu = ({ children, open, opacity = 1 }: any) => {
  return (
    <Box
      component="section"
      className={styled.submenu}
      left={open ? "0!important" : "100%"}
      sx={{ opacity: opacity }}
    >
      {children}
    </Box>
  );
};

const MainMenu = ({ showBack = false, goToMap, openGames = false, setGame, setCampaing }: any) => {
  const [openPoints, setOpenPoints] = useState(false);
  const [openTokens, setOpenTokens] = useState(false);
  const [openMenu, setOpenMenu] = useState(false);
  const [openClaimAll, setOpenClaimAll] = useState(false);
  const [openNotifications, setOpenNotifications] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [openSettings, setOpenSettings] = useState(false);

  const opacityLeaderboard = openPoints || openTokens || openMenu || openClaimAll ? 0 : 1;
  const opacityMenu = openClaimAll || openNotifications || openProfile || openSettings ? 0 : 1;

  return (
    <Box className={styled.panel}>
      {!openGames && (
        <>
          <Leaderboard
            showBack={showBack}
            goToMap={goToMap}
            setOpenPoints={setOpenPoints}
            setOpenTokens={setOpenTokens}
            setOpenMenu={setOpenMenu}
            opacity={opacityLeaderboard}
          />

          {/* submenu Earn Points */}
          <Submenu open={openPoints}>
            <EarnPoints
              setOpenPoints={setOpenPoints}
              setGame={setGame}
              setCampaing={setCampaing}
            />
          </Submenu>

          {/* submenu Tokens */}
          <Submenu open={openTokens}>
            <GetTokens setOpenTokens={setOpenTokens} />
          </Submenu>

          {/* submenu Main Menu */}
          <Submenu open={openMenu} opacity={opacityMenu}>
            <Menu
              setOpenMenu={setOpenMenu}
              setOpenClaimAll={setOpenClaimAll}
              setOpenNotifications={setOpenNotifications}
              setOpenProfile={setOpenProfile}
              setOpenSettings={setOpenSettings}
            />
          </Submenu>

          {/* submenu Claim All */}
          <Submenu open={openClaimAll}>
            <ClaimAll setOpenClaimAll={setOpenClaimAll} />
          </Submenu>

          {/* submenu Notifications */}
          <Submenu open={openNotifications}>
            <Notifications setOpenNotifications={setOpenNotifications} />
          </Submenu>

          {/* submenu Profile */}
          <Submenu open={openProfile}>
            <Profile setOpenProfile={setOpenProfile} />
          </Submenu>

          {/* submenu Settings */}
          <Submenu open={openSettings}>
            <Settings setOpenSettings={setOpenSettings} />
          </Submenu>
        </>
      )}
    </Box>
  );
};
export default MainMenu;
