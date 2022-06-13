import { fork, all } from "@redux-saga/core/effects";

import authSaga from "./auth/auth.saga";
import fileSaga from "./file/file.saga";
import limitSaga from "./limit/limit.saga";

export default function* rootSaga() {
  try {
    yield all([fork(authSaga), fork(fileSaga), fork(limitSaga)]);
  } catch (e) {
    console.log(e);
  }
}
