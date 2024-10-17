import React from "react";
import { useSelector } from "react-redux";
import { getCampaigns } from "reduxConfig/thunks/campaigns";

const Advertisement: React.FC = () => {
  const campaignsData = useSelector(getCampaigns);

  return (
    <div>
      {campaignsData?.length > 0 &&
        campaignsData.map((campaign: any, index: React.Key | null | undefined) => (
          <div key={index}>{campaign.image.src && <img src={campaign.image.src} alt={campaign.image.alt} />}</div>
        ))}
    </div>
  );
};

export default Advertisement;
