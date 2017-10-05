var path = require("path");

module.exports = {
  entry: path.resolve(__dirname, 'src', 'js', 'index.js'),
  output: {
    path: path.resolve(__dirname, 'src'),
    filename: 'bundle.js'
  },
  module: {
    exprContextCritical: false,
    rules: [
      { // Standard Linter
        enforce: 'pre',
        test: /\.js$/,
        include: path.resolve(__dirname, 'src', 'js'),
        exclude: [/node_modules/],
        use: 'standard-loader'
      },
      { // Babel Transpile ESLatest for ES5
        test: path.resolve(__dirname, 'src', 'js'),
        use: {
          loader: 'babel-loader',
          options: 'cacheDirectory=.babel_cache'
        }
      }
    ]
  }
}
