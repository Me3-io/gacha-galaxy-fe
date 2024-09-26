import { useContext, useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import Button from "components/atoms/buttons/base";
//import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

import { MapContext } from "pages/home";

import { useTranslation } from "react-i18next";
import styled from "./styled.module.scss";
import { useSelector } from "react-redux";
import { getLeaderboard } from "reduxConfig/thunks/leaderboard";

const Campaing = () => {
  const { t } = useTranslation();
  const { campaing: details, setCampaing: setDetails } = useContext(MapContext);

  const open = !!details?.claimrId;

  const data = useSelector(getLeaderboard);
  const address = data?.wallets.find((w: any) => w?.active)?.address || "";

  const [loading, setLoading] = useState(false);
  const { signature, message } = JSON.parse(localStorage.getItem("session.account") || "{}");

  const onClose = (evt: any, reason: string) => {
    if (reason !== "backdropClick") {
      console.log("Removing claimr script...", details?.claimrId);
      const scriptLoad = document.querySelector(`script[data-container="${details.claimrId}"]`);
      const claimrWallet = document.querySelector("#claimr-walletconnect-popup");
      if (scriptLoad) scriptLoad.remove();
      if (claimrWallet) claimrWallet.remove();
      window.removeEventListener("message", () => {});
      setDetails({});
    }
  };

  useEffect(() => {
    if (details?.claimrId) {
      //const preLoad = document.querySelector(`script[data-container="${details.claimrId}"]`);
      //if (!preLoad) {
      setLoading(true);
      const receive_message = async (event: any) => {
        const data = event.data;

        if (data.event === "widget::ready") {
          console.log("Widget ready", data);
          //@ts-ignore
          console.log("Widget loaded: ", window?.claimr);
          console.log("address: ", address);
          console.log("signature: ", signature);
          console.log("message: ", message);
          //@ts-ignore
          window?.claimr.connect_wallet(address, signature, message);
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
      //}
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
