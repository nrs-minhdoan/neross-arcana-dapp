import { call, put, takeLatest } from "@redux-saga/core/effects";

import arcanaNetworkSDK from "../../sdks/arcanaNetwork";
import { getStorageStatus, getBandwidthStatus } from "./limit.action";

function* handleGetStorageStatus() {
  try {
    const response: Awaited<
      ReturnType<typeof arcanaNetworkSDK.getUploadLimit>
    > = yield call(arcanaNetworkSDK.getUploadLimit);
    yield put(
      getStorageStatus.success({
        used: response[0] || 0,
        limit: !response[1] && response[1] !== 0 ? undefined : response[1],
      })
    );
  } catch (e: any) {
    console.error(e);
    yield put(getStorageStatus.failure());
  }
}

function* handleGetBandwidthStatus() {
  try {
    const response: Awaited<
      ReturnType<typeof arcanaNetworkSDK.getDownloadLimit>
    > = yield call(arcanaNetworkSDK.getDownloadLimit);
    yield put(
      getBandwidthStatus.success({
        used: response[0] || 0,
        limit: !response[1] && response[1] !== 0 ? undefined : response[1],
      })
    );
  } catch (e: any) {
    console.error(e);
    yield put(getBandwidthStatus.failure());
  }
}

export default function* limitSaga() {
  yield takeLatest(getStorageStatus.request, handleGetStorageStatus);
  yield takeLatest(getBandwidthStatus.request, handleGetBandwidthStatus);
}
