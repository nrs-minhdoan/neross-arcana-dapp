import { call, put, takeLatest } from "@redux-saga/core/effects";

import arcanaNetworkSDK from "../../sdks/arcanaNetwork";
import { APP_ROUTES } from "../../constants/routes.constant";
import { plainToClass } from "../../utils/classTransformer";
import { MyFile } from "../../models/store/file.model";
import { getMyFiles, uploadFile, downloadFile } from "./file.action";

function* handleGetMyFiles() {
  try {
    const response: Awaited<
      ReturnType<typeof arcanaNetworkSDK.getUploadedFilesByMe>
    > = yield call(arcanaNetworkSDK.getUploadedFilesByMe);
    yield put(getMyFiles.success(plainToClass(MyFile, response)));
  } catch (e: any) {
    console.log(e);
    yield put(getMyFiles.failure());
  }
}

function* handleUploadFile({ payload }: ReturnType<typeof uploadFile.request>) {
  try {
    yield call(arcanaNetworkSDK.uploadFile, payload.file, {
      ...payload.callbacks,
    });
    yield put(uploadFile.success());
    if (window.location.pathname.includes(APP_ROUTES.MY_FILES)) {
      yield call(handleGetMyFiles);
    }
  } catch (e: any) {
    console.log(e);
    payload.callbacks.onError();
    yield put(uploadFile.failure());
  }
}

function* handleDownloadFile({
  payload,
}: ReturnType<typeof downloadFile.request>) {
  try {
    yield call(arcanaNetworkSDK.downloadFile, payload.id, {
      onProgress: payload.callbacks.onProgress,
      onSuccess: payload.callbacks.onSuccess,
    });
    yield put(downloadFile.success());
  } catch (e: any) {
    console.log(e);
    payload.callbacks.onError();
    yield put(downloadFile.failure());
  }
}

export default function* fileSaga() {
  yield takeLatest(getMyFiles.request, handleGetMyFiles);
  yield takeLatest(uploadFile.request, handleUploadFile);
  yield takeLatest(downloadFile.request, handleDownloadFile);
}
