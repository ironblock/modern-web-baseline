// @flow
// REDUX SAGA ROOT
// =============================================================================

import { call, all } from 'redux-saga/effects';

const callEvery = (sagas: {[string]: Generator<*, *, *> }) =>
  Object.keys(sagas).map(name => call(sagas[name]));

export default function* rootSaga(): Generator<*, *, *> {
  yield all([
  ]);
}
