import { combineReducers, ReducersMapObject } from "redux";
import { ActionType } from "typesafe-actions";

import { IStoreState } from "../models/store";
import authReducer from "./auth/auth.reducer";
import fileReducer from "./file/file.reducer";

const rootReducer: ReducersMapObject<
  IStoreState,
  ActionType<typeof import("./action").default>
> = {
  auth: authReducer,
  file: fileReducer,
};

export default combineReducers(rootReducer);
