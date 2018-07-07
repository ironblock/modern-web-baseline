// @flow
// AUTH - ACTIONS
// =============================================================================

import * as Types from "./types/auth";

export type LoginRequestBody = { email: string, password: string };
export type LoginSuccessBody = { token: string };

export type LoginRequest = FSA<typeof Types.LOGIN_REQUEST, LoginRequestBody>;
export type LoginFailure = FSA<typeof Types.LOGIN_FAILURE, ?JSONType>;
export type LoginTimeout = FSA<typeof Types.LOGIN_TIMEOUT, ?JSONType>;
export type LoginMistake = FSA<typeof Types.LOGIN_MISTAKE, ?JSONType>;
export type LoginSuccess = FSA<typeof Types.LOGIN_SUCCESS, LoginSuccessBody>;

export const loginRequest: LoginRequestBody => LoginRequest = (
  payload,
  meta
) => ({
  type: Types.LOGIN_REQUEST,
  payload,
  meta
});
export const loginFailure: JSONType => LoginFailure = (payload, meta) => ({
  type: Types.LOGIN_FAILURE,
  error: true,
  payload,
  meta
});
export const loginTimeout: JSONType => LoginTimeout = (payload, meta) => ({
  type: Types.LOGIN_TIMEOUT,
  error: true,
  payload,
  meta
});
export const loginMistake: JSONType => LoginMistake = (payload, meta) => ({
  type: Types.LOGIN_MISTAKE,
  error: true,
  payload,
  meta
});
export const loginSuccess: LoginSuccessBody => LoginSuccess = (
  payload,
  meta
) => ({
  type: Types.LOGIN_SUCCESS,
  payload,
  meta
});
