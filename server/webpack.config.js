var webpack = require('webpack')
var path = require('path')
var fs = require('fs')

var nodeModules = {};

fs.readdirSync('node_modules')
    .filter(x => {
        return ['.bin'].indexOf(x) === -1;
    })
    .forEach(mod => {
        nodeModules[mod] = 'commonjs ' + mod;
    })

module.exports = {
    entry: './server.js',
    target: 'node',
    output: {
        path: path.join(__dirname, 'build'),
        filename: 'bundle.js'
    },
    externals: nodeModules,
    plugins: [
        new webpack.IgnorePlugin(/\.(css|less)$/),
        new webpack.BannerPlugin({banner: 'require("source-map-support").install();', raw: true, entryOnly: false})
    ],
    devtool: 'sourcemap'
}