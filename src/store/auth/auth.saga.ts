import { call, put, select, takeLatest } from "@redux-saga/core/effects";

import arcanaNetworkSDK, { LoginType } from "../../sdks/arcanaNetwork";
import { plainToClass } from "../../utils/classTransformer";
import { IStoreState } from "../../models/store";
import { UserInfo } from "../../models/store/auth.model";
import {
  validateSession,
  initSessionWithGoogle,
  destroySession,
} from "./auth.action";

function* handleValidateSession({
  payload,
}: ReturnType<typeof validateSession>) {
  const isNewSession: boolean = yield select(
    (store: IStoreState) => store.auth.isNewSession
  );
  const isLoggedIn = arcanaNetworkSDK.isLoggedIn;
  if (!isNewSession) {
    if (isLoggedIn) {
      payload.callbacks.onSuccess();
    } else {
      yield put(destroySession());
      payload.callbacks.onError();
    }
  }
}

function* handleInitSessionWithGoogle({
  payload,
}: ReturnType<typeof initSessionWithGoogle.request>) {
  try {
    yield call(arcanaNetworkSDK.loginWithGoogle);
    const userInfoResponse: ReturnType<typeof arcanaNetworkSDK.getUserInfo> =
      yield call(arcanaNetworkSDK.getUserInfo);
    const publicKeyFromAuthResponse: Awaited<
      ReturnType<typeof arcanaNetworkSDK.getPublicKeyFromAuth>
    > = yield call(arcanaNetworkSDK.getPublicKeyFromAuth, {
      verifier: LoginType.google,
      username: userInfoResponse.userInfo.id,
    });
    const walletAddressResponse: string = yield call(
      arcanaNetworkSDK.getWalletAddressFromPrivateKey,
      userInfoResponse.privateKey
    );
    yield put(
      initSessionWithGoogle.success({
        userInfo: plainToClass(UserInfo, userInfoResponse.userInfo),
        walletAddress: walletAddressResponse,
        publicKey: publicKeyFromAuthResponse,
        privateKey: userInfoResponse.privateKey,
      })
    );
    payload.onSuccess();
  } catch (e) {
    console.error(e);
    yield put(initSessionWithGoogle.failure());
    payload.onError();
  }
}

function* handleDestroySession() {
  console.log("logged out: ", "");
  yield call(arcanaNetworkSDK.logout);
}

export default function* authSaga() {
  yield takeLatest(validateSession, handleValidateSession);
  yield takeLatest(initSessionWithGoogle.request, handleInitSessionWithGoogle);
  yield takeLatest(destroySession, handleDestroySession);
}
