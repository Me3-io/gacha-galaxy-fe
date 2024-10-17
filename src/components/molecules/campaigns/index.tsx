import React from "react";
import { useSelector } from "react-redux";
import { getCampaigns } from "reduxConfig/thunks/campaigns";

const Campaigns: React.FC = () => {
  const campaignsData = useSelector(getCampaigns);

  return (
    <div>
      <h2>Campaigns</h2>
      {campaignsData?.length > 0 ? (
        <ul>
          {campaignsData?.map((campaign: any) => (
            <li key={campaign.id}>
              <h3>{campaign.name}</h3>
              <p>{campaign.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No campaigns available.</p>
      )}
    </div>
  );
};

export default Campaigns;
