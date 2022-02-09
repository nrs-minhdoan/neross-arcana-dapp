import { createAction, createAsyncAction } from "typesafe-actions";

import { LoginType } from "../../sdks/arcanaNetwork";
import { UserInfo } from "../../models/store/auth.model";

export const initSession = createAction("auth/INIT_SESSION")<{
  loginType: LoginType;
  userInfo: UserInfo;
  walletAddress: string;
  publicKey: string;
  privateKey: string;
}>();

export const initSessionWithGoogle = createAsyncAction(
  "auth/INIT_SESSION_WITH_GOOGLE",
  "auth/INIT_SESSION_WITH_GOOGLE_SUCCEEDED",
  "auth/INIT_SESSION_WITH_GOOGLE_FAILED"
)<
  {
    onSuccess: () => void;
    onError: () => void;
  },
  {
    userInfo: UserInfo;
    walletAddress: string;
    publicKey: string;
    privateKey: string;
  },
  void
>();

export const destroySession = createAction("auth/DESTROY_SESSION")();
