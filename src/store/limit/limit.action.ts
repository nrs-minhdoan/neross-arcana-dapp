import { createAsyncAction } from "typesafe-actions";

import { ILimitStatus } from "../../models/store/limit.model";

export const getStorageStatus = createAsyncAction(
  "limit/GET_STORAGE_STATUS",
  "limit/GET_STORAGE_STATUS_SUCCEEDED",
  "limit/GET_STORAGE_STATUS_FAILED"
)<void, ILimitStatus, void>();

export const getBandwidthStatus = createAsyncAction(
  "limit/GET_BANDWIDTH_STATUS",
  "limit/GET_BANDWIDTH_STATUS_SUCCEEDED",
  "limit/GET_BANDWIDTH_STATUS_FAILED"
)<void, ILimitStatus, void>();
