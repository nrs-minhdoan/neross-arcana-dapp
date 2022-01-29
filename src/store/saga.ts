import { fork, all } from "@redux-saga/core/effects";

import authSaga from "./auth/auth.saga";

export default function* rootSaga() {
  try {
    yield all([fork(authSaga)]);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e);
  }
}
