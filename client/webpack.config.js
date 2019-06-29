const HtmlWebPackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const webpack = require('webpack')
const path = require('path')
const TerserPlugin = require('terser-webpack-plugin');

const {CLIENT_HOST} = require('dotenv').config().parsed

module.exports = {
  devServer: {
    host: CLIENT_HOST,
    historyApiFallback: true,
    hot: true,
    compress: true
  },
  entry: {
    app: './src/index.js'
  },
  watchOptions: {
    aggregateTimeout: 300,
    poll: 1000
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: '/node_modules/',
        use: [
          {
            loader: 'cache-loader',
            options: {
              cacheDirectory: path.resolve(
                __dirname,
                'node_modules/.cache/cache-loader'
              ),
            },
          },
          'thread-loader',
          'babel-loader'
        ]
      },
      {
        test: /\.jpe?g$|\.ico$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
        loader: 'file-loader?name=[name].[ext]'  // <-- retain original file name
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader'
          }
        ]
      }
    ]
  },
  optimization: {
    splitChunks: {
      chunks: "all"
    },
    minimize: true,
    minimizer: [new TerserPlugin({
      cache: true,
      parallel: true
    })],
    namedModules: false,
    namedChunks: false,
    moduleIds: 'total-size',
    mangleWasmImports: true,
    removeAvailableModules: true,
    occurrenceOrder: true,
    providedExports: true,
    usedExports: true,
    concatenateModules: true,
    sideEffects: true,
    portableRecords: true,
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html'
    }),
    new Dotenv(),
    new webpack.HotModuleReplacementPlugin()
  ]
}
