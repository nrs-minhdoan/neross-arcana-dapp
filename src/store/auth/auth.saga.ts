import { call, put, takeLatest } from "@redux-saga/core/effects";
import upperFirst from "lodash/upperFirst";

import arcanaNetworkSDK from "../../sdks/arcanaNetwork";
import { plainToClass } from "../../utils/classTransformer";
import { UserInfo } from "../../models/store/auth.model";
import { initSessionWithGoogle, destroySession } from "./auth.action";

function* handleInitSessionWithGoogle() {
  try {
    yield call(arcanaNetworkSDK.loginWithGoogle);
    const response: ReturnType<typeof arcanaNetworkSDK.getUserInfo> =
      yield call(arcanaNetworkSDK.getUserInfo);
    yield put(
      initSessionWithGoogle.success({
        userInfo: plainToClass(UserInfo, response.userInfo),
        privateKey: response.privateKey,
      })
    );
  } catch (e: any) {
    if (typeof e === "string") {
      yield put(initSessionWithGoogle.failure(upperFirst(e)));
    } else {
      console.log(e);
    }
  }
}

function handleDestroySession() {
  arcanaNetworkSDK.logout();
}

export default function* authSaga() {
  yield takeLatest(initSessionWithGoogle.request, handleInitSessionWithGoogle);
  yield takeLatest(destroySession, handleDestroySession);
}
