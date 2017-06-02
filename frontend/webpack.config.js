'use strict';

const path = require('path');

module.exports = {
    entry: './src/app.js',
    output: {
        path: __dirname + '/dist',
        filename: 'bundle.js'
    },
    module: {
      loaders: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          include: __dirname,
          loader: 'babel',
          query: {
            presets: ['es2015']
          }
        }
      ]
    }
};
