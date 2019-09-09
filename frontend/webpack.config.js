const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
  mode: 'development',
  entry: ['webpack/hot/dev-server', './src/index.js'],
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
        scss: ['./src/styles/styles.scss']
      }
    })
  ],
  module: {
    rules: [
      {
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      },
      {
        //test: /\.css$/i,
        //use: ['style-loader', 'css-loader']
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          'style-loader',
          // Translates CSS into CommonJS
          'css-loader',
          // Compiles Sass to CSS
          'sass-loader',
        ]        
      }
    ]
  }
}
