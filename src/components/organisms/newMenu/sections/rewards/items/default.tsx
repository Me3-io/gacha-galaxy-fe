import { useState } from "react";
import { Box, Typography } from "@mui/material";

import Button from "components/atoms/buttons/base";
import defaultIcon from "assets/logo.svg";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";

import useAlert from "hooks/alertProvider/useAlert";

import { format } from "date-fns";
import styled from "./styled.module.scss";

const RewardDefault = ({ item }: any) => {
  const [showDetails, setShowDetails] = useState(false);
  const { setAlert } = useAlert();

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code || "");
    setAlert("Copy code to clipboard", "success");
  };

  const handleShowDetails = () => {
    setShowDetails(!showDetails);
  };

  const rewardImage = item?.rewardImage ? item?.rewardImage[0]?.url : null;

  return (
    <>
      <Box className={styled.item}>
        <Box>
          <img src={rewardImage || defaultIcon} alt={"reward"} loading="lazy" />
          <Box>
            <Typography>{item?.rewardName || item?.rewardText || item?.rewardType}</Typography>
            <Typography className={styled.status}>
              <span>{format(item?.date, "d MMMM yy - HH:mm")}</span>
            </Typography>
          </Box>
        </Box>
        <Box>
          <Box className={styled.actions}>
            <Button onClick={() => handleCopy(item?.rewardCopyText || item?.rewardText)}>
              {item?.customButtonText.toUpperCase() || "COPY CODE"}
            </Button>
            <span onClick={handleShowDetails}>
              Details
              {showDetails ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
            </span>
          </Box>
        </Box>
      </Box>
      <Box className={styled.details} display={showDetails ? "flex" : "none"}>
        <Typography dangerouslySetInnerHTML={{ __html: item?.customRewardText || "no data available" }} />
      </Box>
    </>
  );
};
export default RewardDefault;