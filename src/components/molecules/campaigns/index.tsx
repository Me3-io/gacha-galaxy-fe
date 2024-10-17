import React from "react";
import { useSelector } from "react-redux";
import { getCampaigns } from "reduxConfig/thunks/campaigns";

const Campaigns: React.FC = () => {
  const campaignsData = useSelector(getCampaigns);

  return (
    <div>
      {campaignsData?.length > 0 ? (
        campaignsData.map((campaign: any, index: React.Key | null | undefined) => (
          <div key={index}>
            <h3>{campaign.panelName}</h3>
            {campaign.image.src && <img src={campaign.image.src} alt={campaign.image.alt} />}
          </div>
        ))
      ) : (
        <p>No campaigns available.</p>
      )}
    </div>
  );
};

export default Campaigns;
