import { fork, all } from "@redux-saga/core/effects";

import authSaga from "./auth/auth.saga";
import fileSaga from "./file/file.saga";

export default function* rootSaga() {
  try {
    yield all([fork(authSaga)]);
    yield all([fork(fileSaga)]);
  } catch (e) {
    console.log(e);
  }
}
