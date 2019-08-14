const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const scripts = {
  test: /\.js$/,
  exclude: /(node_modules|bower_components)/,
  use: {
    loader: 'babel-loader'
  }
}

const styles = {
      test: /\.scss|css$/,
      loader: [
        'style-loader',
        'css-loader',
        'sass-loader'
      ]
    }


module.exports = {
  mode: 'development',
  entry: ['webpack/hot/dev-server', './src/index.js', './src/test.js'],
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'bundle.js',
    publicPath: '/'
  }, 
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Creditas Challenge',
      hash: true,
      myPageHeader: 'Creditas Challenge',
      template: 'public/index.html',
      filename: 'index.html',
      files: {
        css: ['style.css']
      }
    })
  ],
  module: {
    rules: [
      scripts, styles
    ]
  }
}
