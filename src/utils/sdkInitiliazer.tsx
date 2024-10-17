import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setCampaigns } from "reduxConfig/slices/campaigns";
import { init, getCampaigns, view } from "renovi-utils";

const SDKInitializer: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const initializeSDK = async () => {
      try {
        const success = await init({
          apiKey:
            "MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAFCUZTUFhEEZ2qzfhof4pNO7gUTzO8XfmANaT/qc2g8b3cYf85U44tgzJi23aJXt8NaauyP+Ry7tTF9YNPwvbuCsAaEZH2WrSQKG8WeEP8FTohRfJaAXv0I4/ZBkLtjmdh+ZlW/KIn3R1PJJLv49VPpraARVYuwHHAsOhRPPsEyoujzQ=",
          email: "eveiasenza@7r1ck.com",
          gameId: "7c67ec1c-e5c6-495c-a144-b9cd572b74e6",
          panelNames: ["test1", "test2"],
          prod: true,
        });

        if (success) {
          await view("test1", "https://example.com/view");

          const campaigns = await getCampaigns();
          dispatch(setCampaigns(campaigns));
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
