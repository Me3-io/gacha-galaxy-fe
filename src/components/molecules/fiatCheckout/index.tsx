import { Box } from "@mui/material";
import { client } from "config/thirdwebConfig";
import { PayEmbed } from "thirdweb/react";

import styled from "./styled.module.scss";

const FiatCheckout = () => {
  return (
    <Box className={styled.payEmbed}>
      <PayEmbed
        client={client}
        connectOptions={{
          connectModal: {
            size: "compact",
          },
        }}
        payOptions={{
          buyWithCrypto: false,
        }}
      />
    </Box>
  );
};
export default FiatCheckout;
