// @flow
// REDUX SAGA ROOT
// =============================================================================

import { call, all } from "redux-saga/effects";

import authSagas from "./auth";

const callEvery = (sagas: { [string]: Effect }) =>
  Object.keys(sagas).map(name => call(sagas[name]));

export default function* rootSaga(): Generator<*, *, *> {
  yield all([...callEvery(authSagas)]);
}
