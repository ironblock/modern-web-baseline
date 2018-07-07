// @flow
// REDUX STORE
// =============================================================================
// Configures and de-boilerplates the creation of the Redux store. The
// application uses a single store. It should be required by a `<Provider>`
// client-side or server-side.

import { createStore, applyMiddleware, compose } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "redux-saga";

import type { StateShape } from "./reducers";

import rootReducer from "./reducers";
import rootSaga from "./sagas";

// Fix type for Webpack HMR
declare var module: {
  hot: {
    accept(path: string, callback: () => void): void
  }
};

export function configureStore(): Promise<*> {
  const sagaMiddleware = createSagaMiddleware();
  let initialState: StateShape;
  let composeEnhancers: compose | composeWithDevTools;

  if (process.env.BROWSER) {
    // Do these things only in the browser
    initialState = window.__INITIAL_STATE__;
    composeEnhancers = composeWithDevTools;
  } else {
    // Do these things only on the server
    composeEnhancers = compose;
  }

  // Create store
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware))
  );

  // Configure Webpack HMR to accept changing reducers without a reload
  if (module && module.hasOwnProperty("hot")) {
    module.hot.accept("./reducers", () => {
      const nextReducer = require("./reducers").default; // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  // Begin persisting store
  return new Promise(resolve => {
    // Redux Saga configuration
    sagaMiddleware.run(rootSaga);
    resolve(store);
  });
}
