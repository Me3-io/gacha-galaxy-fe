import React, { useEffect, useState } from "react";
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

import { init } from "renovi-websdk";

const API_BASE_URL = "https://api.dev.nexa.lumenspei.xyz/renovi";
const API_KEY =
  "MIGbMBAGByqGSM49AgEGBSuBBAAjA4GGAAQAFCUZTUFhEEZ2qzfhof4pNO7gUTzO8XfmANaT/qc2g8b3cYf85U44tgzJi23aJXt8NaauyP+Ry7tTF9YNPwvbuCsAaEZH2WrSQKG8WeEP8FTohRfJaAXv0I4/ZBkLtjmdh+ZlW/KIn3R1PJJLv49VPpraARVYuwHHAsOhRPPsEyoujzQ=";
const EMAIL = "eveiasenza@7r1ck.com";
const GAME_ID = "7c67ec1c-e5c6-495c-a144-b9cd572b74e6";
const GEOLOCATION_API_KEY = "bae3bab1b5ee4df493f3650fc7206e50";
const SESSION_ID = uuidv4();

interface ExtendedUserOptions extends UserOptions {
  gameId: string;
  apiKey: string;
  email: string;
  panelNames: string[];
  prod?: boolean;
  sessionId: string;
}

const config: ExtendedUserOptions = {
  siteId: Number(process.env.REACT_APP_COOKIE3_SITE_ID),
  apiKey: API_KEY,
  email: EMAIL,
  gameId: GAME_ID,
  panelNames: ["test1", "test2"],
  prod: false,
  sessionId: SESSION_ID,
};

const analytics = cookie3Analytics(config);

const getCountry = async (): Promise<string> => {
  try {
    const response = await fetch(`https://api.ipgeolocation.io/ipgeo?apiKey=${GEOLOCATION_API_KEY}`);
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

const Initializer = () => {
  const [campaigns, setCampaigns] = useState<Record<string, string>>({});
  const [error, setError] = useState<string | null>(null);

  const getCampaigns = async () => {
    try {
      const panelNamesArray =
        config.panelNames?.length > 0 ? config.panelNames[0].split(",").map((name) => name.trim()) : [];
      const panelsString = panelNamesArray.length > 0 ? `&panels=${panelNamesArray.join("~")}` : "";
      const sessionId = SESSION_ID;
      const url = `${API_BASE_URL}/v1/engine/prebid-ads?gameId=${config.gameId}&sessionId=${sessionId}${panelsString}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Key: config.apiKey,
          Email: config.email,
        },
      });

      if (!response.ok) {
        throw new Error("Failed to fetch ads...");
      }

      const responseData = await response.json();
      const campaignsData = responseData.data;

      const panelsWithWinUrlPlaceholder = campaignsData
        .filter((campaign: any) => campaign.campaigns.some((c: any) => c.winUrl === "PLACEHOLDER"))
        .map((campaign: any) => campaign.panelName);

      if (panelsWithWinUrlPlaceholder.length > 0) {
        const winUrl = `${API_BASE_URL}/v1/engine`;
        const panelNames = panelsWithWinUrlPlaceholder.join("~");
        const queryString = `panels=${encodeURIComponent(panelNames)}&sessionId=${encodeURIComponent(
          sessionId
        )}&gameId=${encodeURIComponent(config.gameId)}`;
        const fullUrl = `${winUrl}?${queryString}`;

        const winUrlResponse = await fetch(fullUrl, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Key: config.apiKey,
            Email: config.email,
          },
        });

        if (!winUrlResponse.ok) {
          throw new Error("Failed to register win URL");
        }

        const responseData2 = await winUrlResponse.json();
        const winUrlData = responseData2;

        campaignsData.forEach((campaign: any) => {
          campaign.campaigns.forEach((c: any) => {
            if (c.winUrl === "PLACEHOLDER") {
              const winUrl2 = winUrlData.data.find((w: any) => w.panelName === campaign.panelName);
              if (winUrl2) {
                c.imagePath = winUrl2.campaigns[0].slides[0].imagePath;
                c.winUrl = "NONE";
                c.viewUrl = "NONE";
                c.slide = winUrl2.campaigns[0].slides[0];
              }
            }
          });
        });
      }

      const result: Record<string, string> = {};
      campaignsData.forEach((campaign: any) => {
        let html = `<div class="renovi-container" id="container-${campaign.panelName}" data-panel-name="${campaign.panelName}" data-view-url="${campaign.campaigns[0].viewUrl}">`;
        if (campaign.campaigns.length > 1) {
          html += `
              <div class="renovi-slider" id="slider-${campaign.panelName}">
                ${campaign.campaigns
                  .map(
                    (c: any, index: number) => `
                    <div class="slide ${index === 0 ? "active" : ""}" id="slide-${c.slide.id}">
                      <img src="${c.imagePath}" alt="Campaign Image" />
                    </div>
                  `
                  )
                  .join("")}
              </div>
            `;
        } else {
          html += `
              <div class="campaign-single">
                <img src="${campaign.campaigns[0].imagePath}" alt="Campaign Image" />
              </div>
            `;
        }
        html += "</div>";
        result[campaign.panelName] = html;
      });

      setCampaigns(result);
    } catch (error) {
      setError("Error fetching campaigns");
      console.error(error);
    }
  };

  useEffect(() => {
    const initializeRenovi = async () => {
      try {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            const { latitude, longitude } = position.coords;

            if (!config.apiKey || !config.email || !config.gameId) {
              throw new Error("Missing configuration for Renovi.");
            }

            const sessionId = uuidv4();
            const country = await getCountry();

            const renoviConfig = {
              ...config,
              country,
              lat: latitude,
              long: longitude,
              sessionId,
            };

            const success = await init(renoviConfig);
            if (success) {
              console.log("Renovi initialized successfully");
              getCampaigns();
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
