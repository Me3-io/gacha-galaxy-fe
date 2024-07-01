import customAxios from "utils/customAxios";

import {
  setBuildingFailure,
  setBuildingStart,
  setBuildingSuccess,
  clearBuilding,
} from "reduxConfig/slices/buildings";

export const fetchBuildings = () => async (dispatch: any) => {
  dispatch(setBuildingStart());
  try {
    const response = await customAxios().get("config/getconfig");
    dispatch(setBuildingSuccess(response.data.data));
    return response.data;
  } catch (error: any) {
    dispatch(setBuildingFailure(error?.message));
  }
};

export const clearBuildings = () => async (dispatch: any) => {
  try {
    dispatch(clearBuilding);
  } catch (error: any) {
    dispatch(setBuildingFailure(error?.message));
  }
};

export const getBuildings = (state: any) => state.buildings.data;
