import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

import styled from "./styled.module.scss";

const Campaing = ({ campaing, handleClose }: any) => {
  const [loading, setLoading] = useState(false);
  const { address, signature, message } = JSON.parse(
    localStorage.getItem("session.account") || "{}"
  );

  useEffect(() => {
    if (campaing.id) {
      const preLoad = document.querySelector(`script[data-container="${campaing.id}"]`);
      if (!preLoad) {

        setLoading(true);
        const receive_message = async (event : any) => {
          const data = event.data;

          if (data.event === 'widget::ready') {
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
        window.addEventListener('message', receive_message);


        setLoading(true);
        console.log("Adding claimr script...", campaing.id);

        const script = document.createElement("script");
        script.defer = true;
        script.src = "https://widgets.claimr.io/claimr.min.js";
        script.id = "claimr-script";
        script.setAttribute("data-addons", "sup,sur");
        script.setAttribute("data-campaign", campaing.id);
        script.setAttribute("data-container", campaing.id);
        script.setAttribute("data-autoresize", "true");
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
          {loading && (
            <Box className={styled.loading}>
              <CircularProgress className={styled.spinner} size={36} />
              loading campaing...
            </Box>
          )}

          <Box id={campaing.id} className={styled.campaign}></Box>
        </Box>
      </>
    </Modal>
  );
};
export default Campaing;
