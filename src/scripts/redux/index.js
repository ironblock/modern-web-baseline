// @flow
// REDUX STORE
// =============================================================================
// Configures and de-boilerplates the creation of the Redux store. The
// application uses a single store. It should be required by a `<Provider>`
// client-side or server-side.

import type Store from 'redux';

import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware, { END } from 'redux-saga';

import type { StateShape } from './reducers';

import rootReducer from './reducers';
import rootSaga from './sagas';

export function configureStore(): Promise<Store> {
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
  const store: Store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(applyMiddleware(sagaMiddleware)),
  );

  // Configure Webpack HMR to accept changing reducers without a reload
  if (typeof module === 'object' && typeof module.hot === 'object' && typeof module.hot.accept === 'function') {
    module.hot.accept('./reducers', () => {
      const nextReducer = require('./reducers').default; // eslint-disable-line global-require

      store.replaceReducer(nextReducer);
    });
  }

  // Begin persisting store
  return new Promise((resolve: Store => void) => {
    // Redux Saga configuration
      store.runSaga = sagaMiddleware.run;
      store.close = (): void => store.dispatch(END);
      store.runSaga(rootSaga);
      resolve(store);
    });
}
