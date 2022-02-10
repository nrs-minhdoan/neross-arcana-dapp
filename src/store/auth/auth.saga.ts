import { call, put, takeLatest } from "@redux-saga/core/effects";

import arcanaNetworkSDK, { LoginType } from "../../sdks/arcanaNetwork";
import { plainToClass } from "../../utils/classTransformer";
import { UserInfo } from "../../models/store/auth.model";
import { initSessionWithGoogle, destroySession } from "./auth.action";

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
    payload.onError();
    yield put(initSessionWithGoogle.failure());
  }
}

function handleDestroySession() {
  arcanaNetworkSDK.logout();
}

export default function* authSaga() {
  yield takeLatest(initSessionWithGoogle.request, handleInitSessionWithGoogle);
  yield takeLatest(destroySession, handleDestroySession);
}
