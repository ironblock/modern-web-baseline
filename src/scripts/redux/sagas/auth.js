// @flow
// AUTH - SAGA
// =============================================================================

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
      body: { email, password }
    });
    let payload;

    switch (response.status) {
      case 200:
        yield put(loginSuccess(response.json()));
        break;

      default:
        payload = response.json ? response.json() : response;

        yield put(loginFailure(payload));
        break;
    }
  } catch (error) {
    yield put(loginMistake(error));
  }
}

export default {
  *watchLoginSaga(): Generator<*, *, *> {
    yield takeLatest(LOGIN_REQUEST, loginSaga);
  }
};
