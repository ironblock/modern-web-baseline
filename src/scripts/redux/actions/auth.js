// @flow
// AUTH - ACTIONS
// =============================================================================
import { createAction } from "redux-actions";

import * as Types from "./types/auth";

export type LoginRequestBody = { email: string, password: string };
export type LoginSuccessBody = { token: string };

export type LoginRequest = FSA<typeof Types.LOGIN_REQUEST, LoginRequestBody>;
export type LoginFailure = FSA<typeof Types.LOGIN_FAILURE, ?JSONType>;
export type LoginTimeout = FSA<typeof Types.LOGIN_TIMEOUT, ?JSONType>;
export type LoginMistake = FSA<typeof Types.LOGIN_MISTAKE, ?JSONType>;
export type LoginSuccess = FSA<typeof Types.LOGIN_SUCCESS, LoginSuccessBody>;

export const loginRequest: LoginRequestBody => LoginRequest = createAction(
  Types.LOGIN_REQUEST
);
export const loginFailure: (error: mixed) => LoginFailure = createAction(
  Types.LOGIN_FAILURE
);
export const loginTimeout: (error: mixed) => LoginTimeout = createAction(
  Types.LOGIN_TIMEOUT
);
export const loginMistake: (error: mixed) => LoginMistake = createAction(
  Types.LOGIN_MISTAKE
);
export const loginSuccess: LoginSuccessBody => LoginSuccess = createAction(
  Types.LOGIN_SUCCESS
);
