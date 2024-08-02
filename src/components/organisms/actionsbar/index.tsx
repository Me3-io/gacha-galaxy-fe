import { useState } from "react";
import { Box } from "@mui/material";

import LanguageMenu from "components/molecules/languaje";
import LanguageIcon from "@mui/icons-material/Language";
import LoginBar from "components/molecules/login";

import styled from "./styled.module.scss";
import CustomTooltip from "components/atoms/materialTooltip";
import { useTranslation } from "react-i18next";

const ActionsBar = () => {
  const { t } = useTranslation();
  // languaje menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const openLng = Boolean(anchorEl);

  return (
    <Box component={"header"} className={styled.actionsBar}>
      <Box className={styled.lngBar}>
        <CustomTooltip title={t("language")}>
          <LanguageIcon onClick={!openLng ? handleOpen : handleClose} className={styled.lngIcon} />
        </CustomTooltip>
        <LanguageMenu anchorEl={anchorEl} open={openLng} handleClose={handleClose} />
      </Box>

      <LoginBar />
    </Box>
  );
};
export default ActionsBar;
