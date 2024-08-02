import customAxios from "utils/customAxios";

import {
  setLeaderboardFailure,
  setLeaderboardStart,
  setLeaderboardSuccess,
  clearLeaderboard as clearLB,
} from "reduxConfig/slices/leaderboard";

export const fetchLeaderboard = () => async (dispatch: any) => {
  dispatch(setLeaderboardStart());
  try {
    const response = await customAxios().get("user/leaderboard");

    const data = response?.data?.result || {};
    dispatch(setLeaderboardSuccess(data));
    return response.data;
  } catch (error: any) {
    dispatch(setLeaderboardFailure(error?.message));
  }
};

export const clearLeaderboard = () => async (dispatch: any) => {
  try {
    dispatch(clearLB);
  } catch (error: any) {
    dispatch(setLeaderboardFailure(error?.message));
  }
};

export const getLeaderboard = (state: any) => state.leaderboard.data;
