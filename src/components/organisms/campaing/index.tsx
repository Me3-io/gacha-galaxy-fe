import { useContext, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import Button from "components/atoms/buttons/base";
//import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { MapContext } from "pages/home";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeaderboard, getLeaderboard } from "reduxConfig/thunks/leaderboard";

import styled from "./styled.module.scss";

const Campaing = () => {
  const { t } = useTranslation();
  const { campaing: details, setCampaing: setDetails } = useContext(MapContext);
  const dispatch = useDispatch();

  const open = !!details?.claimrId;

  const data = useSelector(getLeaderboard);
  const token = data?.userCampaignsToken || "";

  const [loading, setLoading] = useState(false);
  //const { address, signature, message } = JSON.parse(localStorage.getItem("session.account") || "{}");

  const onClose = (evt: any, reason: string) => {
    if (reason !== "backdropClick") {
      console.log("Removing claimr script...", details?.claimrId);
      const scriptLoad = document.querySelector(`script[data-container="${details.claimrId}"]`);
      if (scriptLoad) scriptLoad.remove();

      window.removeEventListener("message", () => {});
      //@ts-ignore
      window.claimr.logout();
      setDetails({});
      dispatch(fetchLeaderboard() as any);
      
      setTimeout(() => {
        //@ts-ignore
        window.claimr.destroy();
        console.log("Claimr destroyed");
      }, 1000);

    }
  };

  useEffect(() => {
    if (details?.claimrId) {
      setLoading(true);
      const receive_message = async (event: any) => {
        const data = event.data;
        if (data.event === "widget::ready") {
          //console.log("Widget ready", data);
          //console.log("Widget loaded: ", window?.claimr);

          //@ts-ignore
          window?.claimr.set_user_token(token);
          //window?.claimr.connect_wallet(address, signature, message);
          setLoading(false);
        }
      };
      window.addEventListener("message", receive_message);

      console.log("Adding claimr script...", details.claimrId);

      const script = document.createElement("script");
      script.defer = true;
      script.src = "https://widgets.claimr.io/claimr.min.js";
      script.id = "claimr-script";
      script.setAttribute("data-addons", "sup,sur,iqv");
      script.setAttribute("data-campaign", details.claimrId);
      script.setAttribute("data-container", details.claimrId);
      script.setAttribute("data-autoresize", "true");
      script.setAttribute("data-organization", "me3");

      document.head.appendChild(script);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details?.claimrId]);

  return (
    <Modal open={open} onClose={onClose} className={styled.modalContainer}>
      <>
        {/*<CloseIcon className={styled.close} onClick={(evt: any) => onClose(evt, "close")} />*/}

        <Box className={styled.modal}>
          <Box className={styled.backButton}>
            <Button onClick={(evt: any) => onClose(evt, "close")}>
              <ArrowBackIcon /> {t("back")}
            </Button>
          </Box>
          {loading && (
            <Box className={styled.loading}>
              <CircularProgress className={styled.spinner} size={36} />
              loading campaign...
            </Box>
          )}

          <Box id={details?.claimrId} className={styled.campaign}></Box>
        </Box>
      </>
    </Modal>
  );
};
export default Campaing;
