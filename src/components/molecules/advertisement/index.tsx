import { Box, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { getCampaigns } from "reduxConfig/thunks/campaigns";

type RenderAdvertisementProps = {
  minImg?: boolean;
};

const RenderAdvertisement = ({ minImg }: RenderAdvertisementProps) => {
  const { t } = useTranslation();

  const campaignsData = useSelector(getCampaigns);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [image, setImage] = useState(campaignsData ? campaignsData[0]?.image?.src : "");

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = (prevIndex + 1) % (campaignsData?.length || 1);
        return nextIndex;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, [campaignsData]);

  useEffect(() => {
    if (campaignsData?.length > 0) {
      setImage(campaignsData[currentIndex]?.image?.src);
    }
  }, [currentIndex, campaignsData]);

  return (
    <>
      {minImg ? (
        <Box
          sx={{
            position: "relative",
            width: "370px",
            height: "140px",
            borderRadius: "20px",
            alignContent: "center",
            overflow: "hidden",
            border: "1px solid #ba00fb!important",
            background: "rgba(58, 31, 80, 0.6)!important",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          <Typography
            sx={{
              fontFamily: "ChakraPetch",
              fontSize: "0.6rem",
              fontWeight: 400,
              position: "absolute",
              top: "70%",
              left: "1rem",
              color: "#B4A6D0",
              transform: "translateY(-50%) rotate(-90deg)",
              transformOrigin: "left center",
            }}
          >
            {t("Advertising")}
          </Typography>
          {image && (
            <img
              src={image}
              alt="Advertisement"
              width="190px"
              height="108px"
              style={{
                display: "block",
                margin: "0 auto",
                transition: "opacity 0.5s ease-in-out",
                opacity: currentIndex % 2 === 0 ? 1 : 0.6,
              }}
            />
          )}
          <Typography
            sx={{
              fontFamily: "ChakraPetch",
              fontSize: "0.6rem",
              fontWeight: 400,
              position: "absolute",
              top: "70%",
              right: "1rem",
              color: "#B4A6D0",
              transform: "translateY(-50%) rotate(90deg)",
              transformOrigin: "right center",
            }}
          >
            {t("Advertising")}
          </Typography>
        </Box>
      ) : (
        <Box
          sx={{
            position: "relative",
            width: "100%",
            height: "190px",
            alignContent: "center",
            overflow: "hidden",
            alignSelf: "center",
            justifyContent: "center",
          }}
        >
          {image && (
            <img
              src={image}
              alt="Advertisement"
              width="100% !important"
              height="177px"
              style={{
                display: "block",
                margin: "0 auto",
                transition: "opacity 0.5s ease-in-out",
                opacity: currentIndex % 2 === 0 ? 1 : 0.6,
              }}
            />
          )}
        </Box>
      )}
    </>
  );
};

export default RenderAdvertisement;
