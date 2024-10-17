import { setCampaigns as setSlice } from "reduxConfig/slices/campaigns";

export const setCampaigns = () => async (dispatch: any) => {
  dispatch(setSlice);
};

export const getCampaigns = (state: any) => state.data;
