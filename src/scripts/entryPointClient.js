// WEBAPP ENTRY POINT - CLIENT
// =============================================================================
// Browser client entry point for the webapp. Contains divergent code which
// should only ever be executed a browser. Analagous to server.js.

// POLYFILLS
import "babel-polyfill";
import "isomorphic-fetch";

import React from "react";
import { BrowserRouter } from "react-router-dom";
import { hydrate } from "react-dom";
import { Provider } from "react-redux";

import { configureStore } from "./redux";
import App from "./App";

// Enable HMR if supported
if (module.hot) module.hot.accept();

// STYLES
require("../styles/index.scss");

// REDUX
configureStore()
  .then(store => {
    // RENDER WEBAPP TO ROOT NODE
    hydrate(
      <Provider store={store}>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>,
      document.getElementById("REACT_ROOT")
    );
  })
  .then(() => {
    document.getElementById("HIDE_FOUC").remove();
  });
