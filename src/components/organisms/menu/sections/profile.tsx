import { useEffect, useRef, useState } from "react";
import { Box, Grid, IconButton, TextField, Typography } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CheckIcon from "@mui/icons-material/Check";
import CreateIcon from "@mui/icons-material/Create";
import CloseIcon from "@mui/icons-material/Close";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";

import Button from "components/atoms/buttons/base";
import styled from "../styled.module.scss";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";
import CustomTooltip from "components/atoms/materialTooltip";

const Profile = ({ setOpenProfile }: any) => {
  const { t } = useTranslation();
  const ref = useRef<HTMLInputElement | null>(null);
  const [onEdit, setOnEdit] = useState(false);
  const leaderboardData = useSelector(getLeaderboard);
  const [nickname, setNickname] = useState("");
  const accountLS = JSON.parse(localStorage.getItem("session.account") || "{}");

  const handleChange = (e: any) => setNickname(e.target.value);
  const handleEdit = () => setOnEdit(true);

  const handleCancel = () => {
    setNickname(leaderboardData?.userNickname);
    setOnEdit(false);
  };

  const handleSave = () => {
    // save new nickname
    setOnEdit(false);
  };

  useEffect(() => {
    setNickname(leaderboardData?.userNickname);
  }, [leaderboardData]);

  return (
    <Grid container flexDirection="column" className={styled.main}>
      <Box className={styled.header}>
        <Button onClick={() => setOpenProfile(false)}>
          <ArrowBackIcon /> {t("back")}
        </Button>
        <Typography pb={2} className={styled.title}>
          {t("menu-profile").toUpperCase()}
        </Typography>
      </Box>
      <Box p={2} px={3} className={styled.container}>
        <Box className={styled.profileContainer}>
          <TextField
            ref={ref}
            type="text"
            size="medium"
            variant="outlined"
            className={styled.textField}
            sx={
              onEdit
                ? { border: "1px solid #ba00fb!important" }
                : { borderBottom: "1px dashed #ba00fbaa!important" }
            }
            disabled={!onEdit}
            value={nickname}
            onChange={handleChange}
            InputProps={{
              endAdornment: (
                <>
                  {!onEdit ? (
                    <IconButton edge="end" color="secondary" onClick={handleEdit}>
                      <CreateIcon />
                    </IconButton>
                  ) : (
                    <Box display={"flex"} gap={1}>
                      <IconButton edge="end" color="secondary" onClick={handleCancel}>
                        <CloseIcon />
                      </IconButton>
                      <IconButton edge="end" color="secondary" onClick={handleSave}>
                        <CheckIcon />
                      </IconButton>
                    </Box>
                  )}
                </>
              ),
            }}
          />

          <Box className={styled.wallet}>
            <Typography>Connected Wallets</Typography>
            <Box display={"flex"} gap={2} alignItems={"center"}>
              <span>
                {`${accountLS?.address?.slice(0, 15)}...${accountLS?.address?.slice(-15)}`}
              </span>

              <CustomTooltip title={t("copy-address")}>
                <ContentCopyIcon
                  sx={{ cursor: "pointer" }}
                  onClick={() => navigator.clipboard.writeText(accountLS?.address || "")}
                />
              </CustomTooltip>
            </Box>
          </Box>
        </Box>
      </Box>
    </Grid>
  );
};
export default Profile;
