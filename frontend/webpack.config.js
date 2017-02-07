'use strict';

const path = require('path');

module.exports = {
    entry: './src/App.js',
    output: {
        path: path.resolve(__dirname, 'dist/'),
        filename: 'bundle.js',
        publicPath: path.resolve(__dirname, '/dist/')
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: __dirname,
          loader: 'babel-loader',
          query: {
            
          }
        }
      ]
    }

};