import { call, put, takeLatest } from "@redux-saga/core/effects";

import arcanaNetworkSDK, { LoginType } from "../../sdks/arcanaNetwork";
import { APP_ROUTES } from "../../constants/routes.constant";
import { plainToClass } from "../../utils/classTransformer";
import { MyFile } from "../../models/store/file.model";
import {
  getMyFiles,
  getSharedWithMeFiles,
  uploadFile,
  downloadFile,
  shareFile,
  getSharedAddresses,
  revokeFile,
  deleteFile,
} from "./file.action";

function* handleGetMyFiles() {
  try {
    const response: Awaited<
      ReturnType<typeof arcanaNetworkSDK.getUploadedFilesByMe>
    > = yield call(arcanaNetworkSDK.getUploadedFilesByMe);
    yield put(getMyFiles.success(plainToClass(MyFile, response)));
  } catch (e: any) {
    console.error(e);
    yield put(getMyFiles.failure());
  }
}

function* handleGetShareWithMeFiles() {
  try {
    const response: Awaited<
      ReturnType<typeof arcanaNetworkSDK.getSharedFilesWithMe>
    > = yield call(arcanaNetworkSDK.getSharedFilesWithMe);
    yield put(getSharedWithMeFiles.success(plainToClass(MyFile, response)));
  } catch (e: any) {
    console.error(e);
    yield put(getSharedWithMeFiles.failure());
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
    console.error(e);
    yield put(uploadFile.failure());
    payload.callbacks.onError();
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
    console.error(e);
    yield put(downloadFile.failure());
    payload.callbacks.onError();
  }
}

function* handleShareFile({ payload }: ReturnType<typeof shareFile.request>) {
  try {
    const response: Awaited<
      ReturnType<typeof arcanaNetworkSDK.getPublicKeyFromAuth>
    > = yield call(arcanaNetworkSDK.getPublicKeyFromAuth, {
      verifier: LoginType.google,
      username: payload.email,
    });
    yield call(arcanaNetworkSDK.shareFile, {
      id: payload.id,
      publicKey: response,
      validity: 1,
    });
    yield put(shareFile.success());
    payload.callbacks.onSuccess();
  } catch (e: any) {
    console.error(e);
    yield put(shareFile.failure());
    payload.callbacks.onError();
  }
}

function* handleGetSharedAddresses({
  payload,
}: ReturnType<typeof getSharedAddresses.request>) {
  try {
    const response: Awaited<
      ReturnType<typeof arcanaNetworkSDK.getSharedAddresses>
    > = yield call(arcanaNetworkSDK.getSharedAddresses, payload);
    yield put(getSharedAddresses.success(response));
  } catch (e: any) {
    console.error(e);
    yield put(getSharedAddresses.failure());
  }
}

function* handleRevokeFile({ payload }: ReturnType<typeof revokeFile.request>) {
  try {
    yield call(arcanaNetworkSDK.revokeFile, {
      id: payload.id,
      address: payload.address,
    });
    yield put(revokeFile.success());
    yield call(handleGetSharedAddresses, { payload: payload.id } as ReturnType<
      typeof getSharedAddresses.request
    >);
    payload.callbacks.onSuccess();
  } catch (e: any) {
    console.error(e);
    yield put(revokeFile.failure());
    payload.callbacks.onError();
  }
}

function* handleDeleteFile({ payload }: ReturnType<typeof deleteFile.request>) {
  try {
    yield call(arcanaNetworkSDK.deleteFile, payload.id);
    yield put(deleteFile.success());
    if (window.location.pathname.includes(APP_ROUTES.MY_FILES)) {
      yield call(handleGetMyFiles);
    }
    payload.callbacks.onSuccess();
  } catch (e: any) {
    console.error(e);
    payload.callbacks.onError();
    yield put(deleteFile.failure());
  }
}

export default function* fileSaga() {
  yield takeLatest(getMyFiles.request, handleGetMyFiles);
  yield takeLatest(getSharedWithMeFiles.request, handleGetShareWithMeFiles);
  yield takeLatest(uploadFile.request, handleUploadFile);
  yield takeLatest(downloadFile.request, handleDownloadFile);
  yield takeLatest(shareFile.request, handleShareFile);
  yield takeLatest(getSharedAddresses.request, handleGetSharedAddresses);
  yield takeLatest(revokeFile.request, handleRevokeFile);
  yield takeLatest(deleteFile.request, handleDeleteFile);
}
