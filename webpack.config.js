const webpackExternals = require('webpack-node-externals')

module.exports = {
    entry: './src',
    output: {
        path : __dirname,
        filename: 'index.js'
    },
    mode: 'production',
    target: 'node',
    externals: [webpackExternals()]

}