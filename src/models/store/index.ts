import { PersistPartial } from "redux-persist/lib/persistReducer";

import { IAuthStoreState } from "./auth.model";
import { IFileStoreState } from "./file.model";
import { ILimitStoreState } from "./limit.model";

export interface IStoreState {
  auth: IAuthStoreState & PersistPartial;
  file: IFileStoreState;
  limit: ILimitStoreState;
}
