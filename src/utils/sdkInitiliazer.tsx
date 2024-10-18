import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCampaigns } from "reduxConfig/slices/campaigns";
import { init, getCampaigns } from "renovi-utils";

const parseHTMLToJson = (campaignData: Record<string, string>) => {
  const campaigns = [];

  for (const [panelName, htmlString] of Object.entries(campaignData)) {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlString, "text/html");

    const container = doc.querySelector(".renovi-container");
    const viewUrl = container?.getAttribute("data-view-url");
    const img = doc.querySelector(".campaign-single img");
    const imgSrc = img?.getAttribute("src");
    const imgAlt = img?.getAttribute("alt");

    campaigns.push({
      panelName: panelName || null,
      viewUrl: viewUrl || null,
      image: {
        src: imgSrc || null,
        alt: imgAlt || null,
      },
    });
  }

  return campaigns;
};

const SDKInitializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const success = await init({
          apiKey:
            "MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAcX0zDstF6k10y4hwziXwzREQAfxdDA2ydB+v36ijQiOnhrgP7B3oknVHyx/IM9AfiM/oL9na8BjhZWQeNvHN9Y8AYyrY2peY9PrePD7wOU92pKHMYqLGXZgkYxviJ2UW+McguNoC74Ot/2QJ2NVoglcCHSQO/Er/MBtPBY/nfeRU2kY=",
          email: "renovi@me3.io",
          gameId: "d1dd1a42-f35a-4857-bf42-3bcccb1f1653",
          panelNames: ["panel-1 , panel-2"],
          prod: true,
        });

        if (success) {
          const campaignsResponse = await getCampaigns();
          const campaignsData = campaignsResponse;
          const parsedCampaigns = parseHTMLToJson(campaignsData);
          dispatch(setCampaigns(parsedCampaigns));
        } else {
          console.error("Error to initialize SDK");
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    initializeSDK();
  }, [dispatch]);

  return null;
};

export default SDKInitializer;
