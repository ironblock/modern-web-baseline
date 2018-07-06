// DEVELOPMENT - WEBPACK CONFIG
// =============================================================================
const webpack = require('webpack');
const FriendlyErrorsWebpackPlugin = require('friendly-errors-webpack-plugin');

const { paths, plugins, rules, entryPoints } = require('./base.config');
const { protocol, host, port } = require('../server/config').development;

const friendlyConfig = {
  compilationSuccessInfo: {
    messages: [`Development server running: ${protocol}://${host}:${port}`],
  },
  shouldClearConsole: false,
};

module.exports = [
  // CLIENT BUNDLE
  {
    name: 'client',
    mode: 'development',
    performance: { hints: false },
    devtool: 'eval-source-map',
    entry: [ 'babel-polyfill', 'webpack-hot-middleware/client', entryPoints.client ],
    output: {
      path: paths.assets,
      filename: '[hash].js',
      publicPath: '/assets/',
    },
    plugins: [
      ...plugins.development,
      new webpack.HotModuleReplacementPlugin(),
      new webpack.DefinePlugin({
        'process.env': {
          BROWSER: JSON.stringify(true),
        },
      }),
    ],
    module: {
      rules: [
        rules.script,
        rules.style,
        rules.json,
        rules.file,
      ],
    },
  },

  // SERVER BUNDLE
  {
    name: 'server',
    mode: 'development',
    performance: { hints: false },
    devtool: 'cheap-module-inline-source-map',
    target: 'node',
    externals: /^[a-z\-0-9]+$/,
    entry: entryPoints.server,
    output: {
      path: paths.assets,
      filename: 'server.js',
      publicPath: '/assets/',
      libraryTarget: 'commonjs2',
    },
    plugins: [
      ...plugins.development,
      new FriendlyErrorsWebpackPlugin(friendlyConfig),
      new webpack.DefinePlugin({
        'process.env': {
          BROWSER: JSON.stringify(false)
        },
      }),
    ],
    module: {
      rules: [
        rules.script,
        rules.style,
        rules.json,
        rules.file,
      ],
    },
  },
];
