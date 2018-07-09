// @flow
// AUTH - REDUCER
// =============================================================================

import type {
  LoginSuccessBody,
  LoginSuccess,
  LoginFailure,
  LoginTimeout,
  LoginMistake
} from "../actions/auth";
import { handleActions } from "redux-actions";

// ACTION TYPES
import {
  handleRequest,
  handleSuccess,
  handleFailure,
  handleTimeout,
  handleMistake,
  initialEndpointState
} from "../utility";
import {
  LOGIN_REQUEST,
  LOGIN_MISTAKE,
  LOGIN_TIMEOUT,
  LOGIN_FAILURE,
  LOGIN_SUCCESS
} from "../actions/types/auth";

export type AuthState = {
  authToken: {| ...ApiEndpointState, success: ?LoginSuccessBody |}
};

export const initialState: AuthState = {
  authToken: initialEndpointState
};

const handlerMap = {
  [LOGIN_REQUEST]: state => handleRequest("authToken", state),
  [LOGIN_SUCCESS]: (state, action: LoginSuccess) =>
    handleSuccess("authToken", state, action),
  [LOGIN_FAILURE]: (state, action: LoginFailure) =>
    handleFailure("authToken", state, action),
  [LOGIN_TIMEOUT]: (state, action: LoginTimeout) =>
    handleTimeout("authToken", state, action),
  [LOGIN_MISTAKE]: (state, action: LoginMistake) =>
    handleMistake("authToken", state, action)
};

export default handleActions(handlerMap, initialState);
