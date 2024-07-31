import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: null,
  loading: false,
  error: null,
};

const buildingsSlice = createSlice({
  name: "building",
  initialState,
  reducers: {
    setBuildingStart(state) {
      state.loading = true;
      state.error = null;
    },
    setBuildingSuccess(state, { payload }) {
      state.data = payload;
      state.loading = false;
    },
    setBuildingFailure(state, { payload }) {
      state.loading = false;
      state.error = payload;
    },
    clearBuilding(state) {
      state.data = initialState.data;
      state.loading = initialState.loading;
      state.error = initialState.error;
    },
  },
});

export const { setBuildingStart, setBuildingSuccess, setBuildingFailure, clearBuilding } =
  buildingsSlice.actions;

export default buildingsSlice.reducer;
