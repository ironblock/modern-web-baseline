// @flow
// APP ROOT
// =============================================================================

import type { Dispatch } from "redux";
import React, { Fragment } from "react";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

import type { StateShape } from "./redux/reducers";
import * as authActions from "./redux/actions/auth";
import * as authSelectors from "./redux/selectors/auth";

/* eslint-disable no-use-before-define */
type StateProps = {|
  ...$Call<typeof mapStateToProps, StateShape>
|};

type DispatchProps = {|
  ...$Call<typeof mapDispatchToProps, Dispatch<*>>
|};
type Props = StateProps & DispatchProps;
/* eslint-enable no-use-before-define */

type State = {
  email: string,
  password: string
};

class App extends React.Component<Props, State> {
  state = {
    email: "peter@klaven",
    password: ""
  };

  render() {
    return (
      <main>
        <label htmlFor="email">Email</label>
        <input
          id="email"
          type="text"
          value={this.state.email}
          onChange={e => this.setState({ email: e.target.value })}
          disabled={this.props.loggingIn}
        />
        <label htmlFor="password">Password</label>
        <input
          id="password"
          type="password"
          value={this.state.password}
          onChange={e => this.setState({ password: e.target.value })}
          disabled={this.props.loggingIn}
        />
        <small>{'The password is "cityslicka"'}</small>
        {this.props.authToken && (
          <Fragment>
            <h4>Your auth token is</h4>
            <code>{JSON.stringify(this.props.authToken, null, 2)}</code>
          </Fragment>
        )}
        {this.props.lastCallFailed && (
          <Fragment>
            <h4>{"Your last call failed."}</h4>
            <p>{"Here's why:"}</p>
            <code>{JSON.stringify(this.props.authFailure, null, 2)}</code>
          </Fragment>
        )}
        <button
          onClick={() =>
            this.props.handleLoginRequest(this.state.email, this.state.password)
          }
        >
          Submit
        </button>
      </main>
    );
  }
}

// REDUX
const mapStateToProps = (state: StateShape): StateProps => ({
  loggingIn: authSelectors.isLoginPending(state),
  authToken: authSelectors.getAuthToken(state),
  authFailure: authSelectors.getLatestAuthFailure(state),
  lastCallFailed:
    authSelectors.getAuthLastResult(state) &&
    authSelectors.getAuthLastResult(state) !== "success"
});

const mapDispatchToProps = (dispatch: Dispatch<*>): DispatchProps => ({
  handleLoginRequest: (email, password) =>
    dispatch(authActions.loginRequest({ email, password }))
});

export default withRouter(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(App)
);
