// @flow
// AUTH - SAGA
// =============================================================================

import type { Saga, Effect } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import type { LoginRequest } from "../actions/auth";
import { LOGIN_REQUEST } from "../actions/types/auth";
import { login } from "../../api/auth";
import { loginSuccess, loginFailure, loginMistake } from "../actions/auth";

export function* loginSaga(action: LoginRequest): Generator<Effect, void, *> {
  try {
    const { email, password } = action.payload || {};

    if (!email) {
      throw new Error("email is required");
    }
    if (!password) {
      throw new Error("password is required");
    }

    const { status, body } = yield call(login, email, password);

    if (status === "SUCCESS") {
      yield put(loginSuccess(body));
    } else {
      yield put(loginFailure(body));
    }
  } catch (error) {
    if (error instanceof Error) {
      yield put(loginMistake(error.message));
    } else if (error) {
      yield put(loginMistake(JSON.stringify(error)));
    }
  }
}

export default {
  *watchLoginSaga(): Saga<void> {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
  }
};
