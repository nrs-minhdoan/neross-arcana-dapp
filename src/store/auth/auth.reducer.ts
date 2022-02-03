import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";
import { createReducer } from "typesafe-actions";

import { LoginType } from "../../sdks/arcanaNetwork";
import { IAuthStoreState } from "../../models/store/auth.model";
import {
  initSession,
  initSessionWithGoogle,
  destroySession,
} from "./auth.action";

const initialState: IAuthStoreState = {
  loginType: undefined,
  userInfo: undefined,
  privateKey: undefined,
  loading: false,
  error: undefined,
};

const authReducer = createReducer<IAuthStoreState>(initialState)
  .handleAction(initSession, (state, { payload }) => {
    return {
      ...state,
      loginType: payload.loginType,
      userInfo: payload.userInfo,
      privateKey: payload.privateKey,
    };
  })
  .handleAction(destroySession, (state) => {
    return {
      ...state,
      loginType: undefined,
      userInfo: undefined,
      privateKey: undefined,
    };
  })
  .handleAction(initSessionWithGoogle.request, (state) => {
    return {
      ...state,
      loginType: undefined,
      userInfo: undefined,
      privateKey: undefined,
      loading: true,
    };
  })
  .handleAction(initSessionWithGoogle.success, (state, { payload }) => {
    return {
      ...state,
      loginType: LoginType.google,
      userInfo: payload.userInfo,
      privateKey: payload.privateKey,
      loading: false,
    };
  })
  .handleAction(initSessionWithGoogle.failure, (state, { payload }) => {
    return { ...state, error: payload, loading: false };
  });

const persistConfig = {
  key: "auth",
  whitelist: ["loginType", "userInfo", "privateKey"],
  storage,
};

export default persistReducer(persistConfig, authReducer);
