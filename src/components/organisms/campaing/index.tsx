import { useEffect, useState } from "react";
import { Box, Modal } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import CircularProgress from "@mui/material/CircularProgress";

import styled from "./styled.module.scss";

const Campaing = ({ details, setDetails }: any) => {
  const open = !!details?.claimrId;
  const [loading, setLoading] = useState(false);
  const { address, signature, message } = JSON.parse(
    localStorage.getItem("session.account") || "{}"
  );
  

  useEffect(() => {
    if (details?.claimrId) {
      const preLoad = document.querySelector(`script[data-container="${details.claimrId}"]`);
      if (!preLoad) {

        const receive_message = async (event : any) => {
          const data = event.data;

          if (data.event === 'widget::ready') {
                console.log("Widget ready", data);
                //@ts-ignore
                console.log("script loaded: ", window?.claimr);
                console.log("address: ", address);
                console.log("signature: ", signature);
                console.log("message: ", message);
                //@ts-ignore
                window?.claimr.connect_wallet(address, signature, message);
          }
        };
        window.addEventListener('message', receive_message);

        setLoading(true);
        console.log("Adding claimr script...", details.claimrId);

        const script = document.createElement("script");
        script.defer = true;
        script.src = "https://widgets.claimr.io/claimr.min.js";
        script.id = "claimr-script";
        script.setAttribute("data-addons", "sup,sur");
        script.setAttribute("data-campaign", details.claimrId);
        script.setAttribute("data-container", details.claimrId);
        script.setAttribute("data-autoresize", "true");
        script.setAttribute("data-organization", "me3");

        // script.onload = async () => {
        //   setTimeout(() => setLoading(false), 2000);
          //@ts-ignore
          // console.log("script loaded: ", window?.claimr);
          // console.log("address: ", address);
          // console.log("signature: ", signature);
          // console.log("message: ", message);
          //@ts-ignore
          // window?.claimr.connect_wallet(address, signature, message);
        // };

        document.head.appendChild(script);
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [details?.claimrId]);

  return (
    <Modal open={open} onClose={() => setDetails({})} className={styled.modalContainer}>
      <>
        <CloseIcon className={styled.close} onClick={() => setDetails({})} />
        <Box className={styled.modal}>
          {loading && (
            <Box className={styled.loading}>
              <CircularProgress className={styled.spinner} size={36} />
              loading campaing...
            </Box>
          )}

          <Box id={details?.claimrId} className={styled.campaign}></Box>
        </Box>
      </>
    </Modal>
  );
};
export default Campaing;
