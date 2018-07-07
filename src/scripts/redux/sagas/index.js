// @flow
// REDUX SAGA ROOT
// =============================================================================

import { call, all } from "redux-saga/effects";

import auth from "./auth";

export default function* rootSaga(): Generator<*, *, *> {
  yield all([call(auth.watchLoginSaga)]);
}
