// @flow
// AUTH - SAGA
// =============================================================================

import type { Saga, Effect } from "redux-saga";
import { call, put, takeLatest } from "redux-saga/effects";

import type { LoginRequest } from "../actions/auth";
import { LOGIN_REQUEST } from "../actions/types/auth";
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

    const response = yield call(fetch, "https://reqres.in/api/login", {
      method: "POST",
      body: JSON.stringify({ email, password })
    });

    let responseBody;

    if (response.json) {
      responseBody = yield call(response.json);
    } else {
      responseBody = response;
    }

    switch (response.status) {
      case 200:
        yield put(loginSuccess(responseBody));
        break;

      default:
        yield put(loginFailure(responseBody));
        break;
    }
  } catch (error) {
    yield put(loginMistake(error));
  }
}

export default {
  *watchLoginSaga(): Saga<void> {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
  }
};
