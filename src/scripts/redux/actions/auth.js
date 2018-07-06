// @flow
// AUTH - ACTIONS
// =============================================================================
import { createAction } from "redux-actions";

import * as Types from "./types/auth";

export const loginRequest = createAction(Types.LOGIN_REQUEST);
export const loginFailure = createAction(Types.LOGIN_FAILURE);
export const loginSuccess = createAction(Types.LOGIN_SUCCESS);
