// @flow
// AUTH - REDUCER
// =============================================================================

import { handleActions } from 'redux-actions';

// ACTION TYPES
import type { ReducerState } from '../utility';
import {
  handleRequest,
  handleSuccess,
  handleFailure,
  handleTimeout,
  handleMistake,
} from '../utility';
import {
  LOGIN_REQUEST,
  LOGIN_MISTAKE,
  LOGIN_TIMEOUT,
  LOGIN_FAILURE,
  LOGIN_SUCCESS,
} from '../actions/types/auth';

export type AuthState = {
  authToken: ReducerState<"authToken">,
};

export const initialState: AuthState = {
  authToken: null,
};

const handlerMap = {
  [LOGIN_REQUEST]: state =>
    handleRequest('authToken', state),
  [LOGIN_MISTAKE]: (state, action) =>
    handleSuccess('authToken', state, action),
  [LOGIN_TIMEOUT]: (state, action) =>
    handleFailure('authToken', state, action),
  [LOGIN_FAILURE]: (state, action) =>
    handleTimeout('authToken', state, action),
  [LOGIN_SUCCESS]: (state, action) =>
    handleMistake('authToken', state, action),
};

export default handleActions(handlerMap, initialState);
