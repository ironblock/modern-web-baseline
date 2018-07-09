// BASE - WEBPACK CONFIG
// =============================================================================
// Provides core settings and options that are used by all other webpack
// configuration files. Avoid repeating definitions by creating named exports
// in this file instead.

const path = require("path");

const webpack = require("webpack");
const MinifyPlugin = require("babel-minify-webpack-plugin");

const paths = {
  node_modules: path.join(__dirname, "..", "node_modules"),
  bootstrap: path.join(__dirname, "..", "node_modules/bootstrap"),
  dist: path.join(__dirname, "..", "dist"),
  assets: path.join(__dirname, "..", "dist", "assets"),
  stats: path.join(__dirname, "..", "dist", "stats.generated.json"),
  public: path.join(__dirname, "..", "public"),
  favicons: path.join(__dirname, "..", "public", "favicons"),
  scriptSrc: path.join(__dirname, "..", "src", "scripts"),
  styleSrc: path.join(__dirname, "..", "src", "styles"),
  fontSrc: path.join(__dirname, "..", "src", "fonts"),
  imageSrc: path.join(__dirname, "..", "src", "images")
};

const entryPoints = {
  client: path.join(paths.scriptSrc, "entryPointClient.js"),
  server: path.join(paths.scriptSrc, "entryPointServer.js")
};

const regex = {
  script: /\.(js|jsx)$/,
  json: /\.(json|schema)$/,
  file: /\.(woff|woff2|svg|png|jpg|jpeg|ico)/,
  style: /\.(css|scss)$/
};

const plugins = {
  development: [],
  production: [
    new webpack.optimize.AggressiveMergingPlugin(),
    new MinifyPlugin()
  ]
};

const rules = {
  // SCRIPTS
  script: {
    test: regex.script,
    use: {
      loader: "babel-loader",
      options: { babelrc: true }
    },
    include: [paths.scriptSrc]
  },

  // STYLESHEETS
  style: {
    test: regex.style,
    use: ["style-loader", "css-loader", "sass-loader"],
    include: [paths.bootstrap, paths.styleSrc, paths.scriptSrc]
  },

  // JSON
  json: {
    test: regex.json,
    use: {
      loader: "json-loader",
      options: { name: "[name].[ext]" }
    }
  },

  // FONTS AND IMAGES
  file: {
    test: regex.file,
    use: {
      loader: "url-loader",
      options: {
        limit: 5000,
        name: "[name].[ext]"
      }
    },
    include: [paths.imageSrc, paths.fontSrc, paths.node_modules]
  }
};

module.exports = { paths, regex, plugins, rules, entryPoints };
