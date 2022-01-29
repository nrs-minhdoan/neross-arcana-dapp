import { PersistPartial } from "redux-persist/lib/persistReducer";

import { IAuthStoreState } from "./auth.model";

export interface IStoreState {
  auth: IAuthStoreState & PersistPartial;
}
