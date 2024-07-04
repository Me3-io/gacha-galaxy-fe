import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import styled from "./styled.module.scss";
import { useEffect } from "react";

const Campaing = ({ campaing, handleClose }: any) => {

  useEffect(() => {
    if (campaing.id) {
      
      const preLoad = document.querySelector(`script[data-container="${campaing.id}"]`);
      if (!preLoad) {
        console.log("Adding claimr script...", campaing.id);

        const script = document.createElement("script");
        script.defer = true;
        script.src = "https://widgets.claimr.io/claimr.min.js";
        script.id = "claimr-script";
        script.setAttribute("data-addons", "sup,sur");
        script.setAttribute("data-campaign", "me3-alpha-journey");
        script.setAttribute("data-autoresize", "true");
        script.setAttribute("data-container", campaing.id);
        script.setAttribute("data-organization", "me3");

        document.head.appendChild(script);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [campaing.id]);

  return (
    <Modal open={campaing.open} onClose={handleClose} className={styled.modalContainer}>
      <>
        <CloseIcon className={styled.close} onClick={handleClose} />
        <Box className={styled.modal}>
          <Box id={campaing.id} className={styled.campaign}></Box>
        </Box>
      </>
    </Modal>
  );
};
export default Campaing;
