var path = require('path')
var webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://localhost:8080',
    './index.js'
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devtool: 'inline-source-map',
  devServer: {
    overlay: true,
    contentBase: path.resolve(__dirname, 'dist'),
    // match the output path
    proxy: {
      '/api': 'http://localhost:3000'
    },
    publicPath: '/'
    // match the output `publicPath`
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: ['babel-loader'],
        exclude: /node_modules/
      }
    ]
  },
  watch: true
}

