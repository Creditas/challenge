var webpack = require('webpack')
var path = require('path')

module.exports = {
  mode: "development",
  entry: {
    app: './src/app.js',
    // messageBox: './src/messageBox.js'
  },
  output: {
    // path: path.resolve(__dirname, "dist"),
    // filename: 'bundle.js',
    // sourceMapFilename: 'bundle.map',
    // publicPath: "/public/",

    path: __dirname + '/public/javascript',
    filename: 'bundle.js'
  },
  devtool: '#source-map',
  module: {
    rules: [{
      test: /\.(js|jsx)?(\.erb)?$/,
      exclude: /node_modules/,
      loader: 'babel-loader',
      options: {
        presets: ["babel-polyfill", "es2015", "stage-0", "react"]
      }
    }]
  }
}
