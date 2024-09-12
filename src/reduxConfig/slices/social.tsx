import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
};

const socialSlice = createSlice({
  name: "social",
  initialState,
  reducers: {
    setSocial(state, { payload }) {
      state.data = payload;
    },
    clearSocial(state) {
      state.data = initialState.data;
    },
  },
});

export const { setSocial, clearSocial } = socialSlice.actions;

export default socialSlice.reducer;
