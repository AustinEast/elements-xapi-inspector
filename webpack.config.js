const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const Crx = require("crx-webpack-plugin");
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = {
    context: __dirname + '/app',
    devtool: 'cheap-module-source-map',
    entry: {
        popup: './popup.js',
        background: './background.js'

    },
    output: {
        path: __dirname + '/dist',
        filename: "[name].js"
    },
    cache: true,
    module: {
        loaders: [
            /* ES6 + JSX */
            {
                test: /\.jsx?$/,
                exclude: [/node_modules/],
                loaders: ['babel?stage=1']
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css')
            },
            {
                test: /\.less$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css!less')
            },
            {
                test: /\.(png|jpg)$/, 
                loader: 'url-loader?limit=8192'
            }
        ]
    },
    resolve: {
        extensions: ['', '.js', '.jsx']
    },
    plugins: [
        new CleanWebpackPlugin(['dist']),
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development')
        }),
        new ExtractTextPlugin('styles.css'),
        new Crx({
            keyFile: 'dev.pem',
            contentPath: 'dist',
            outputPath: './dist/chrome-plugin/',
            name: 'Elements xAPI Inspector'
        })
    ]

}
