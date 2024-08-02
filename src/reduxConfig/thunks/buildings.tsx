import customAxios from "utils/customAxios";

import {
  setBuildingFailure,
  setBuildingStart,
  setBuildingSuccess,
  clearBuilding,
} from "reduxConfig/slices/buildings";

const createCode = (name: string) => name?.toLowerCase().replace(/\s/g, "-");

export const fetchBuildings = () => async (dispatch: any) => {
  dispatch(setBuildingStart());
  try {
    const response = await customAxios().get("config/getconfig");

    const data = response.data.data;
    const buildings = data?.map((item: any) => ({
      ...item,
      code: createCode(item?.name),
      games: item?.games?.map((game: any) => ({
        ...game,
        code: createCode(game?.name),
      })),
    }));

    dispatch(setBuildingSuccess(buildings));
    return buildings;
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
