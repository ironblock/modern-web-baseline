// SERVER - ENTRY POINT
// =============================================================================

// POLYFILLS
import "babel-polyfill";
import "isomorphic-fetch";

import React from "react";
import { renderToString, renderToStaticMarkup } from "react-dom/server";
import { StaticRouter } from "react-router";
import { Provider } from "react-redux";

// CONTENT
import { configureStore } from "./redux";
import Html from "./Html";
import App from "./App";

// HELPERS
// =======
function getPathsFromStats(chunkName, regex, stats) {
  let assets = [];

  if (
    stats.clientStats &&
    stats.clientStats.assetsByChunkName &&
    stats.clientStats.assetsByChunkName[chunkName]
  ) {
    assets = assets.concat(stats.clientStats.assetsByChunkName[chunkName]);
  } else if (stats.assetsByChunkName && stats.assetsByChunkName[chunkName]) {
    assets = assets.concat(stats.assetsByChunkName[chunkName]);
  }

  return assets
    .filter(filePath => regex.test(filePath))
    .map(filePath => filePath);
}

// Create a static representation of the react app and use it to wrap the route
// content and initial/dehydrated application state.
function render(store, stats, request, context) {
  const state = store.getState();

  const vendorJs = getPathsFromStats("vendor", /\.js$/, stats);
  const js = getPathsFromStats("main", /\.js$/, stats);
  const vendorCss = getPathsFromStats("vendor", /\.css$/, stats);

  const css = getPathsFromStats("main", /\.css$/, stats);

  const content = (
    <Html
      initialState={JSON.stringify(state)}
      css={[...vendorCss, ...css]}
      js={[...vendorJs, ...js]}
      html={renderToString(
        <Provider store={store}>
          <StaticRouter location={request.url} context={context}>
            <App />
          </StaticRouter>
        </Provider>
      )}
    />
  );

  return renderToStaticMarkup(content);
}

export default stats => {
  if (process.env.DEV_TOOLS) {
    console.info("Development tools have been enabled");
  }
  if (process.env.VERSION) {
    console.info(`Built Version: ${process.env.VERSION}`);
  }
  if (process.env.GIT_COMMIT) {
    console.info(`Commit Hash: ${process.env.GIT_COMMIT}`);
  }
  if (process.env.BUILD_NUMBER) {
    console.info(`Build Number: ${process.env.BUILD_NUMBER}`);
  }

  return (req, res, next) => {
    // return res.send(`<!doctype html>`);
    try {
      const context = {};

      configureStore().then(store => {
        const markup = render(store, stats, req, context);

        if (context.url) {
          const querystring = context.from ? `?from=${context.from}` : "";
          return res.redirect(
            context.status || 302,
            `${context.url}${querystring}`
          );
        }

        return res.send(`<!doctype html>${markup}`);
      });
    } catch (error) {
      console.error(error);
      // Pass the error to the next middleware. It may wish to act on it or
      // display it in some special way.
      next(error);
    }
  };
};
