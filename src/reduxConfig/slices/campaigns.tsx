import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const campaignSlice = createSlice({
  name: "campaigns",
  initialState,
  reducers: {
    setCampaigns(state, { payload }) {
      state.data = payload;
    },
  },
});

export const { setCampaigns } = campaignSlice.actions;

export default campaignSlice.reducer;
