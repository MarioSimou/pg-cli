const webpackExternals = require('webpack-node-externals')

module.exports = {
    entry: './src',
    output: {
        path : __dirname,
        filename: 'index.js',
        library: 'pg-sql',
        libraryTarget: 'umd',
        umdNamedDefine: true,
    },
    optimization: {
        minimize: true,
        namedModules: true
    },
    mode: 'production',
    target: 'node',
    externals: [webpackExternals()]

}