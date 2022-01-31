import { createAction } from "typesafe-actions";

import { UserInfo } from "../../models/store/auth.model";

export const loadSession = createAction("auth/LOAD_SESSION")();

export const unloadSession = createAction("auth/UNLOAD_SESSION")();

export const initSession = createAction("auth/INIT_SESSION")<{
  token: string;
  userInfo: UserInfo;
}>();

export const destroySession = createAction("auth/DESTROY_SESSION")();
