module.exports = {
  context: __dirname,
  target: 'node',
  devtool: 'inline-source-map',
  module: {
    loaders: [
      {
          test: /\.scss$/,
          loader: ['css-loader?sourceMap', 'sass'],
          exclude: [/node_modules/]
      },
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015']
        }
      },
      { test: /index\.html$/, loader: 'html?minimize=false', exclude: [/node_modules/] },
      { test: /\.html$/, loader: 'html', exclude: [/node_modules/, /index\.html/] }
    ]
  },
  sassLoader: {
      includePaths: [
          'src/sass/'
      ]
  }
};
