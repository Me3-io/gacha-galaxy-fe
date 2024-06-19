import { combineReducers } from "redux";
import messageAuthReducer from "../slices/messageAuth";

export const rootReducer = combineReducers({
  messageAuth: messageAuthReducer,
});

export default rootReducer;
