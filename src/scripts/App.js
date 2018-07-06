// @flow
// APP ROOT
// =============================================================================

import React, { Fragment } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";

// import Navigation from './components/Navigation';
// import Footer from './components/Footer';
// import PrivateRoute from './containers/PrivateRoute';

import type { StateShape } from "./redux/reducers";
// import * as authSelectors from './selectors/auth';
// import * as routerSelectors from './selectors/router';
// import { appRoutes } from './route.config';

type Props = {
  /* eslint-disable no-use-before-define */
  ...$Call<typeof mapStateToProps, *>
  /* eslint-enable no-use-before-define */
};

class App extends React.Component<Props> {
  render() {
    return <h1>I like big butts and I cannot lie</h1>;
  }
}

// REDUX
const mapStateToProps = (state: StateShape): Props => ({
  authToken: state.auth.authToken
});

export default withRouter(
  connect(
    mapStateToProps,
    null
  )(App)
);
