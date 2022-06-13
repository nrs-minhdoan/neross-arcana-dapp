import { createReducer } from "typesafe-actions";

import { ILimitStoreState } from "../../models/store/limit.model";
import { destroySession } from "../auth/auth.action";
import { getStorageStatus, getBandwidthStatus } from "./limit.action";

const initialState: ILimitStoreState = {
  storage: {
    used: 0,
    limit: undefined,
  },
  bandwidth: {
    used: 0,
    limit: undefined,
  },
};

const limitReducer = createReducer<ILimitStoreState>(initialState)
  .handleAction(getStorageStatus.request, (state) => {
    return { ...state, storage: { used: 0, limit: undefined } };
  })
  .handleAction(getStorageStatus.success, (state, { payload }) => {
    return { ...state, storage: payload };
  })
  .handleAction(getStorageStatus.failure, (state) => {
    return state;
  })
  .handleAction(getBandwidthStatus.request, (state) => {
    return { ...state, bandwidth: { used: 0, limit: undefined } };
  })
  .handleAction(getBandwidthStatus.success, (state, { payload }) => {
    return { ...state, bandwidth: payload };
  })
  .handleAction(getBandwidthStatus.failure, (state) => {
    return state;
  })
  .handleAction(destroySession, () => {
    return initialState;
  });

export default limitReducer;
