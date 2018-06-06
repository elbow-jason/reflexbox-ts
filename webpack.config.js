const path = require("path")

module.exports = {
  entry: "./src/index.ts",
  output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, 'dist')
  },
  resolve: {
      extensions: [".ts", ".tsx", ".js"]
  },
  module: {
    rules: [
        // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
        { test: /\.tsx?$/, loader: "ts-loader" },

        // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
        { enforce: "pre", test: /\.js$/, loader: "source-map-loader" }
    ]
},
}