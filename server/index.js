// @flow
// WEBSERVER
// =============================================================================

// Remove BROWSER flag to ensure all serverside logic is properly excecuted
delete process.env.BROWSER;

// Display unhandled promise rejection tracebacks in node console
process.on("unhandledRejection", rejection => console.error(rejection));

const path = require("path");

const express = require("express");
const webpack = require("webpack");
const devMiddleware = require("webpack-dev-middleware");
const hotMiddleware = require("webpack-hot-middleware");
const hotServerMiddleware = require("webpack-hot-server-middleware");

const config = require("./config");
let port = 80;

const app = express();

// In the case of NODE_ENV=staging or undefined default to production.
const nodeEnv =
  process.env.NODE_ENV === "development" ? "development" : "production";

console.info(`Starting webserver with NODE_ENV=${nodeEnv}`);

// EXPRESS CONFIGURATION
// =====================
app.use("/public", express.static(path.join(__dirname, "..", "public")));

// LIVE DEVELOPMENT MODE
if (nodeEnv === "development") {
  const webpackConfig = require("../webpack/development.config");
  const rootCompiler = webpack(webpackConfig);

  port = config.development.port;

  app.use(
    devMiddleware(rootCompiler, {
      publicPath: webpackConfig[0].output.publicPath,
      serverSideRender: true,
      stats: "errors-only"
    })
  );

  app.use(
    hotMiddleware(
      rootCompiler.compilers.find(compiler => compiler.name === "client")
    )
  );
  app.use(hotServerMiddleware(rootCompiler));
} else if (nodeEnv === "production") {
  // const stats = require("../dist/stats.generated.json");
  // const serverRenderer = require("../dist/server").default;
  // port = config.development.port;
  // app.use(
  //   "/assets/",
  //   Express.static(path.join(__dirname, "..", "dist", "assets"))
  // );
  // app.use(serverRenderer(stats));
  // app.use((err, req, res) => {
  //   console.error(err.stack);
  //   res.status(500).send("Internal server error: 500");
  // });
} else {
  throw new Error(`A mode of "${nodeEnv}" is not supported`);
}

app.listen(port, () => {
  if (nodeEnv === "development") {
    console.info("Webpack build running, please wait...");
  }
});
