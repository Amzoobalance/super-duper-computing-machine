// eslint-disable-next-line
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin")
const CopyPlugin = require("copy-webpack-plugin")

module.exports = [
  new ForkTsCheckerWebpackPlugin(),
  new CopyPlugin({
    patterns: [{ from: "./src/assets", to: "src/assets" }],
  }),
]
