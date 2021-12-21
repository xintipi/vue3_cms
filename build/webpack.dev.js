'use strict'

const webpack = require('webpack')
const { merge } = require('webpack-merge')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')

const common = require('./webpack.common.js')
const paths = require('./paths')

module.exports = merge(common('development'), {
  // Set the mode to development or production
  mode: 'development',

  entry: [
    paths.appIndexJs,
    require.resolve('webpack-dev-server/client'),
  ],

  output: {
    path: paths.appBuild,
    publicPath: paths.publicUrlOrPath,
    filename: 'static/js/bundle.js',
    chunkFilename: 'static/js/[name].chunk.js',
  },

  // Spin up a server for quick development
  devServer: {
    static: {
      directory:paths.appPublic,
      publicPath:paths.publicUrlOrPath,
      watch: true,
    },
    historyApiFallback: true,
    open: true,
    port: 8080,
    compress: true,
    liveReload: true,
  },

  plugins: [
    new CleanWebpackPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
})
