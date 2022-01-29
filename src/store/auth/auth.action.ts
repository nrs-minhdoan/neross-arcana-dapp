import { createAction } from "typesafe-actions";

import { UserInfo } from "../../models/store/auth.model";

export const initSession = createAction("auth/INIT_SESSION")<{
  token: string;
  userInfo: UserInfo;
}>();

export const destroySession = createAction("auth/DESTROY_SESSION")();
