// @flow
// ACCOUNT - SELECTORS
// ============================================================================

/*
 * WARNING: This file was automatically generated. Do not modify it directly, or
 * your changes will be overwritten.
 */

import { createSelector } from "reselect";
import type { StateShape } from "../reducers";

export const getAuthState = (state: StateShape) => state.auth.authToken;
export const isLoginPending = (state: StateShape) =>
  state.auth.authToken.isFetching;
export const getAuthLastResult = (state: StateShape) =>
  state.auth.authToken.lastResult;
export const getAuthToken = (state: StateShape) => state.auth.authToken.success;
export const getAuthTimeout = (state: StateShape) =>
  state.auth.authToken.timeout;
export const getAuthFailure = (state: StateShape) =>
  state.auth.authToken.failure;
export const getAuthMistake = (state: StateShape) =>
  state.auth.authToken.mistake;

export const getLatestAuthFailure = createSelector(
  getAuthState,
  cached =>
    cached.lastResult && cached.lastResult !== "success"
      ? cached[cached.lastResult]
      : null
);
