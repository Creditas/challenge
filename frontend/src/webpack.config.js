module.exports = {
  entry: `${__dirname}/src/App.js`,
  output: {
    path: `${__dirname}/dist`,
    filename: 'bundle.js'
  },
  mode: 'production',
  watch: true,
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env']
          }
        }
      }]
    }
  }
