const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ScriptExtHtmlWebpackPlugin = require('script-ext-html-webpack-plugin');

const extractSass = new ExtractTextPlugin('stylesheets/styles-[hash].css');
const indexHTML = new HtmlWebpackPlugin({ template: './index.html' });
const scriptTags = new ScriptExtHtmlWebpackPlugin({
    defaultAttribute: 'async'
});

module.exports = {
    context: __dirname,
    entry: './src/js/index.js',
    output: {
        path: `${__dirname}/dist`,
        filename: 'main-[hash].js'
    },
    devtool: 'inline-source-map',
    devServer: {
        contentBase: './dist'
    },
    module: {
        loaders: [
            {
                test: /\.scss$/,
                loader: extractSass.extract(['css-loader?-minimize', 'sass']),
                exclude: [/node_modules/]
            },
            {
              test: /\.js$/,
              exclude: /(node_modules|specs)/,
              loader: 'babel-loader',
              query: {
                presets: ['es2015']
              }
            },
            { test: /index\.html$/, loader: 'html?minimize=false', exclude: [/node_modules/] },
            { test: /\.html$/, loader: 'html', exclude: [/node_modules/, /index\.html/] },
            { test: /\.png$/, loader: 'url-loader?name=[name]-[hash].[ext]', exclude: [/node_modules/] }
        ]
    },
    sassLoader: {
        includePaths: [
            'src/sass/'
        ]
    },
    plugins: [
        extractSass,
        indexHTML,
        scriptTags
    ]
};
