import { IStoreState } from "../models/store";

declare module "react-redux" {
  export interface DefaultRootState extends IStoreState {}
}
