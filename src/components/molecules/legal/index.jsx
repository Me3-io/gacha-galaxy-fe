import { useState } from "react";
import { Box, Typography } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import Checkbox from "components/atoms/checkbox";
import Button from "components/atoms/buttons/default";

import styled from "./styled.module.scss";

const ModalLegal = ({ handleClose }) => {
  const [checkboxes, setCheckboxes] = useState(false);

  const handleCheckboxChange = (checked) => {
    setCheckboxes(checked);
  };

  const handleProceedClick = () => {
    if (checkboxes) {
      handleClose(true);
      localStorage.setItem("legalCheck", true);
    }
  };

  return (
    <Box className={styled.wrapperModal}>
      <Box className={styled.modal}>
        <CloseIcon className={styled.close} onClick={() => handleClose(false)} />
        <div className={styled.title}>Welcome to Gacha Galaxy</div>
        <div className={styled.subtitle}>
          By checking the box next to each of the items below and clicking “<b>proceed</b>”, you acknowledge that you
          have read, understand, and accept these disclosure, and that you will not circumvent any gameplay limitations
          that Me3 has put in place to comply with your local and regional laws. You also acknowledge that this service
          is purely for entertainment, and not a gambling service:
        </div>
        <Box className={styled.legalContainer}>
          <Box className={styled.optionsLegal}>
            <Checkbox
              checked={checkboxes.termsOfUse}
              onChange={(e) => handleCheckboxChange(e.target.checked)}
              required
            />
            <Box>
              <Typography>
                I have read and agree to the Me3{" "}
                <a
                  className={styled.redirect}
                  href="https://help.me3.io/en/articles/9245378-terms-of-use"
                  target="_blank"
                  rel="noreferrer"
                >
                  Terms of Use
                </a>
                ,{" "}
                <a
                  className={styled.redirect}
                  href="https://help.me3.io/en/articles/9245363-privacy-policy"
                  target="_blank"
                  rel="noreferrer"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  className={styled.redirect}
                  href="https://help.me3.io/en/articles/9245321-risk-disclaimers-disclosures"
                  target="_blank"
                  rel="noreferrer"
                >
                  Risk Disclaimers & Disclosures
                </a>
              </Typography>
            </Box>
          </Box>

          <Box className={styled.buttonContainer}>
            <Button onClick={handleProceedClick} disabled={!checkboxes}>
              PROCEED
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ModalLegal;
