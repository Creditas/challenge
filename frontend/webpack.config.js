var webpack = require('webpack')
var path = require('path')

module.exports = {
  mode: "development",
  entry: {
    app: './src/app.js',
    // messageBox: './src/messageBox.js'
  },
  output: {
    filename: 'public/build/bundle.js',
    sourceMapFilename: 'public/build/bundle.map'
  },
  devtool: '#source-map',
  module: {
    rules: [{
      test: /\.jsx?$/,
      exclude: /(node_modules)/,
      loader: 'babel-loader',
      options: {
        presets: ['react', 'es2015']
      }
    }]
  }
}
