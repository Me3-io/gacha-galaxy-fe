import { useState } from "react";
import { Box } from "@mui/material";

import LanguageMenu from "components/molecules/languaje";
import LanguageIcon from "@mui/icons-material/Language";
import HelpIcon from '@mui/icons-material/HelpOutline';
import LoginBar from "components/molecules/login";

import styled from "./styled.module.scss";
import CustomTooltip from "components/atoms/materialTooltip";
import { useTranslation } from "react-i18next";
import { useTour } from "@reactour/tour";

const ActionsBar = () => {
  const { t } = useTranslation();
  // languaje menu
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const handleOpen = (event: any) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);
  const openLng = Boolean(anchorEl);

  const { setIsOpen, setCurrentStep } = useTour();

  return (
    <Box component={"header"} className={styled.actionsBar}>
      <CustomTooltip title={"help"}>
        <HelpIcon onClick={() => { setCurrentStep(0); setIsOpen(true) }} className={styled.helpIcon} />
      </CustomTooltip>

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
