import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const claimSlice = createSlice({
  name: "claim",
  initialState,
  reducers: {
    setClaimStart(state) {
      state.loading = true;
      state.error = null;
    },
    setClaimSuccess(state, { payload }) {
      state.data = payload;
      state.loading = false;
    },
    setClaimFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
    clearClaim(state) {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
});

export const { setClaimStart, setClaimSuccess, setClaimFailure, clearClaim } = claimSlice.actions;

export default claimSlice.reducer;
