const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['webpack/hot/dev-server', './app/scripts/index.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Creditas Challenge',
      hash: true,
      myPageHeader: 'Creditas Challenge',
      template: 'public/index.html',
      filename: 'index.html',
      files: {
        css: ['./app/styles/main.css'],
      },
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
}
