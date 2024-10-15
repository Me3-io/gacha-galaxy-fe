import React, { useEffect } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

import "./i18n";

import store from "reduxConfig/store";
import { Provider } from "react-redux";
import { ThirdwebProvider } from "thirdweb/react";
import { AlertProvider } from "hooks/alertProvider/alertContext";

import { UserOptions, cookie3Analytics } from "@cookie3/analytics";
import { Cookie3Provider } from "hooks/cookie3Provider";

import App from "App";
import "./index.css";

import { init, getCampaigns } from "renovi-websdk";

const config: UserOptions = {
  siteId: Number(process.env.REACT_APP_COOKIE3_SITE_ID),
};

const analytics = cookie3Analytics(config);

const Initializer = () => {
  useEffect(() => {
    const initializeRenovi = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            const apiKey =
              "MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAFCUZTUFhEEZ2qzfhof4pNO7gUTzO8XfmANaT/qc2g8b3cYf85U44tgzJi23aJXt8NaauyP+Ry7tTF9YNPwvbuCsAaEZH2WrSQKG8WeEP8FTohRfJaAXv0I4/ZBkLtjmdh+ZlW/KIn3R1PJJLv49VPpraARVYuwHHAsOhRPPsEyoujzQ=";
            const email = "eveiasenza@7r1ck.com";
            const gameId = "7c67ec1c-e5c6-495c-a144-b9cd572b74e6";

            if (!apiKey || !email || !gameId) {
              throw new Error("Missing configuration for Renovi.");
            }

            const sessionId = uuidv4();
            const country = await getCountry();

            const config = {
              apiKey,
              email,
              gameId,
              panelNames: ["test1", "test2"],
              prod: false,
              country,
              lat: latitude,
              long: longitude,
              sessionId,
            };

            const success = await init(config);
            if (success) {
              console.log("Renovi initialized successfully");

              try {
                const campaigns = await getCampaigns();
                console.log("campaigns:", campaigns);
              } catch (error) {
                console.error("Error fetching campaigns:", error);
              }
            } else {
              console.error("Failed to initialize Renovi");
            }
          },
          (error) => {
            console.error("Geolocation error:", error);
          }
        );
      } catch (error) {
        console.error("Error initializing Renovi:", error);
      }
    };

    initializeRenovi();
  }, []);

  const getCountry = async () => {
    const apiKey = "bae3bab1b5ee4df493f3650fc7206e50";
    try {
      const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${apiKey}`);
      const data = await response.json();
      if (data && data.country_code2) {
        return data.country_code2;
      }
      throw new Error("Failed to fetch country code.");
    } catch (error) {
      console.error("Error fetching country code:", error);
      return "Unknown";
    }
  };

  return null;
};

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Cookie3Provider value={analytics}>
        <Provider store={store}>
          <ThirdwebProvider>
            <AlertProvider>
              <Initializer />
              <App />
            </AlertProvider>
          </ThirdwebProvider>
        </Provider>
      </Cookie3Provider>
    </BrowserRouter>
  </React.StrictMode>
);
