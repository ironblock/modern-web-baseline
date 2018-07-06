// @flow
// ROOT - REDUCER
// =============================================================================
// Root collection point for all reducers. This must not ever use "export *" -
// it causes cross-environment problems.

import { combineReducers } from 'redux';

import type { AuthState } from "./auth";

import auth from "./auth";

export type StateShape = {
  auth: AuthState
};

const rootReducer: StateShape = combineReducers({
  auth,
});

export default rootReducer;
