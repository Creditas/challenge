const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    entry: ['webpack/hot/dev-server', './src/index.jsx'],
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
                css: ['style.css'],
            },
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                loader: 'babel-loader',
            },
            {
                test: /\.(css|sass|scss)$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
    resolve: {
        extensions: ['.js', '.jsx'],
        alias: {
            Lib: path.resolve(__dirname, './src/components/lib'),
            Components: path.resolve(__dirname, './src/components'),
            Provider: path.resolve(__dirname, './src/provider'),
            Helpers: path.resolve(__dirname, './src/helpers'),
        },
    },
};
