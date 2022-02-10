import { persistReducer } from "redux-persist";
import { CookieStorage } from "redux-persist-cookie-storage";
import Cookies from "js-cookie";
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
  walletAddress: undefined,
  publicKey: undefined,
  privateKey: undefined,
  loading: false,
};

const authReducer = createReducer<IAuthStoreState>(initialState)
  .handleAction(initSession, (state, { payload }) => {
    return {
      ...state,
      loginType: payload.loginType,
      userInfo: payload.userInfo,
      walletAddress: payload.walletAddress,
      publicKey: payload.publicKey,
      privateKey: payload.privateKey,
    };
  })
  .handleAction(destroySession, (state) => {
    return initialState;
  })
  .handleAction(initSessionWithGoogle.request, (state) => {
    return {
      ...state,
      loginType: undefined,
      userInfo: undefined,
      walletAddress: undefined,
      publicKey: undefined,
      privateKey: undefined,
      loading: true,
    };
  })
  .handleAction(initSessionWithGoogle.success, (state, { payload }) => {
    return {
      ...state,
      loginType: LoginType.google,
      userInfo: payload.userInfo,
      walletAddress: payload.walletAddress,
      publicKey: payload.publicKey,
      privateKey: payload.privateKey,
      loading: false,
    };
  })
  .handleAction(initSessionWithGoogle.failure, (state) => {
    return { ...state, loading: false };
  });

const persistConfig = {
  key: "auth",
  whitelist: [
    "loginType",
    "userInfo",
    "walletAddress",
    "publicKey",
    "privateKey",
  ],
  storage: new CookieStorage(Cookies, { expires: 43200000 }),
};

export default persistReducer(persistConfig, authReducer);
