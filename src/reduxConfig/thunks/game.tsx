import { setGame as setSlice, clearGame as clearSlice } from "reduxConfig/slices/game";

export const setGame = () => async (dispatch: any) => {
  dispatch(setSlice);
};
export const clearGame = () => async (dispatch: any) => {
  dispatch(clearSlice);
};

export const getGame = (state: any) => state.game.data;
