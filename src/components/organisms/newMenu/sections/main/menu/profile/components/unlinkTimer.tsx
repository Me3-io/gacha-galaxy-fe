import { useState } from "react";
import { Box, Link, Typography } from "@mui/material";

import LinkOffIcon from "@mui/icons-material/LinkOff";
import CustomTooltip from "components/atoms/materialTooltip";

import styled from "../styled.module.scss";

const LIMIT_TIMER = 10;

const UnlinkTimmer = ({ address, unlinkWallet }: any) => {
  const [unLinkTimer, setUnLinkTimer] = useState(LIMIT_TIMER);

  const initUnlink = () => {
    setUnLinkTimer((prev) => prev - 1);

    let counter = 0;
    const timer = setInterval(() => {
      counter++;
      if (counter < LIMIT_TIMER) {
        setUnLinkTimer((prev) => prev - 1);
      } else {
        clearInterval(timer);
      }
    }, 1000);
  };

  const confirm = () => {
    unlinkWallet(address);
    setUnLinkTimer(LIMIT_TIMER);
  };

  return (
    <>
      {unLinkTimer === LIMIT_TIMER && (
        <CustomTooltip title={"Unlink"}>
          <LinkOffIcon sx={{ cursor: "pointer" }} onClick={initUnlink} />
        </CustomTooltip>
      )}
      {unLinkTimer < LIMIT_TIMER && unLinkTimer > 0 && <Typography>{unLinkTimer}</Typography>}
      {unLinkTimer === 0 && (
        <Box className={styled.actionsUnlink}>
          <CustomTooltip title={"Cancel Unlink"}>
            <Link onClick={() => setUnLinkTimer(LIMIT_TIMER)}>Cancel</Link>
          </CustomTooltip>
          <CustomTooltip title={"Confirm Unlink"}>
            <Link onClick={confirm}>Confirm</Link>
          </CustomTooltip>
        </Box>
      )}
    </>
  );
};

export default UnlinkTimmer;
