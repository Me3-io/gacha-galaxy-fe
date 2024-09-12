import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const mapsSlice = createSlice({
  name: "maps",
  initialState,
  reducers: {
    setMapStart(state) {
      state.loading = true;
      state.error = null;
    },
    setMapSuccess(state, { payload }) {
      state.data = payload;
      state.loading = false;
    },
    setMapFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
    clearMaps(state) {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
});

export const { setMapStart, setMapSuccess, setMapFailure, clearMaps } = mapsSlice.actions;

export default mapsSlice.reducer;
