import customAxios from 'utils/customAxios';

import { setMapFailure, setMapStart, setMapSuccess, clearMaps as clear } from 'reduxConfig/slices/maps';

const createCode = (name: string) => name?.toLowerCase().replace(/\s/g, '-');

export const fetchMaps = () => async (dispatch: any) => {
  dispatch(setMapStart());
  try {
    const response = await customAxios().get('config/getconfig');

    const data = response.data.data;
    const maps = data?.map((map: any) => ({
      ...map,
      code: map.urlSlug || createCode(map?.title),
      buildings: map?.buildings
        ? map?.buildings?.map((building: any) => ({
            ...building,
            code: building.urlSlug || createCode(building?.name),
            games: building?.games
              ? building?.games?.map((game: any) => ({
                  ...game,
                  code: game.urlSlug || createCode(game?.name),
                }))
              : null,
          }))
        : null,
    }));

    dispatch(setMapSuccess(maps));
    return maps;
  } catch (error: any) {
    dispatch(setMapFailure(error?.message));
    return false;
  }
};

export const clearMaps = () => async (dispatch: any) => {
  try {
    dispatch(clear);
  } catch (error: any) {
    dispatch(setMapFailure(error?.message));
  }
};

export const getMaps = (state: any) => state.maps.data;
