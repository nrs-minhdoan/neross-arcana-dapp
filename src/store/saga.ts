import { fork, all } from "@redux-saga/core/effects";

import authSaga from "./auth/auth.saga";

export default function* rootSaga() {
  try {
    yield all([fork(authSaga)]);
  } catch (e) {
    console.log(e);
  }
}
