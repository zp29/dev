
var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: [
        './app/js/app'
    ],
    output: {
        filename: 'app.js',
        publicPath: '/dist'
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin()
    ],
    module: {
        loaders: [{
            test: /\.js$/,
            loader: 'babel-loader'
        }]
    }
};
