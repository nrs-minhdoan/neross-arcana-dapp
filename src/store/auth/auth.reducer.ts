import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { createReducer } from "typesafe-actions";

import { IAuthStoreState } from "../../models/store/auth.model";
import {
  loadSession,
  unloadSession,
  initSession,
  destroySession,
} from "./auth.action";

const initialState: IAuthStoreState = {
  token: undefined,
  userInfo: undefined,
  loading: false,
};

const authReducer = createReducer<IAuthStoreState>(initialState)
  .handleAction(loadSession, (state) => {
    return {
      ...state,
      loading: true,
    };
  })
  .handleAction(unloadSession, (state) => {
    return {
      ...state,
      loading: false,
    };
  })
  .handleAction(initSession, (state, { payload }) => {
    return {
      ...state,
      token: payload.token,
      userInfo: payload.userInfo,
      loading: false,
    };
  })
  .handleAction(destroySession, (state) => {
    return {
      ...state,
      token: undefined,
      userInfo: undefined,
    };
  });

const persistConfig = {
  key: "auth",
  whitelist: ["token", "userInfo"],
  storage,
};

export default persistReducer(persistConfig, authReducer);
