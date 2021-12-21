'use strict'

const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const Dotenv = require('dotenv-webpack')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const {VueLoaderPlugin} = require('vue-loader')

// Source maps are resource heavy and can cause out of memory issue for large source files.
const shouldUseSourceMap = false

module.exports = function (webpackEnv) {
  const isEnvDevelopment = webpackEnv === 'development'
  const isEnvProduction = webpackEnv === 'production'

  return {
    // Stop compilation early in production
    bail: isEnvProduction,

    devtool: isEnvProduction ? (shouldUseSourceMap ? 'source-map' : false) : 'cheap-module-source-map',

    plugins: [
      new VueLoaderPlugin(),

      // Generates an `index.html` file with the <script> injected.
      new HtmlWebpackPlugin(
        Object.assign(
          {},
          {
            inject: true,
            template: paths.appHtml,
            title: 'Vuejs 3',
            favicon: 'public/favicon.ico'
          },
          isEnvProduction
            ? {
              minify: {
                removeComments: true,
                collapseWhitespace: true,
                removeRedundantAttributes: true,
                useShortDoctype: true,
                removeEmptyAttributes: true,
                removeStyleLinkTypeAttributes: true,
                keepClosingSlash: true,
                minifyJS: true,
                minifyCSS: true,
                minifyURLs: true
              }
            }
            : undefined
        )
      ),

      // Makes some environment variables available to the JS code.
      new Dotenv({
        path: isEnvDevelopment ? process.env.APP_ENV : process.env.APP_ENV
      }),

      // Copies files from target to destination folder
      new CopyWebpackPlugin({
         patterns:[
          {
            from: paths.appPublic ,
            globOptions: {
                 ignore: ['*.DS_Store', '**/index.html', isEnvProduction && '**/service-worker.js'].filter(Boolean)
              }
          },
         ]
      })
    ],

    // Determine how modules within the project are treated
    module: {
      rules: [
        // This package allows transpiling JavaScript files using Babel and webpack.
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: ['babel-loader']
        },
        // Webpack loader for Vue.js components
        {
          test: /\.vue$/,
          loader: 'vue-loader'
        },
        // Inject CSS into the DOM.
        {
          test: /\.(scss|css)$/,
          use: [
            'style-loader',
            // The css-loader interprets @import and url() like import/require() and will resolve them
            {
              loader: 'css-loader',
              options: {
                sourceMap: isEnvProduction && shouldUseSourceMap,
                importLoaders: 1
              }
            },
            // Loader to process CSS with PostCSS.
            {
              loader: 'postcss-loader',
              options: {
                sourceMap: isEnvProduction && shouldUseSourceMap
              }
            },
            // Loads a Sass/SCSS file and compiles it to CSS.
            {
              loader: 'sass-loader',
              options: {
                sourceMap: isEnvProduction && shouldUseSourceMap,
                sassOptions: {
                  includePaths: [paths.appSrc, 'node_modules']
                }
              }
            }
          ]
        },
        // A Less loader for webpack. Compiles Less to CSS.
        {
          test: /\.less$/,
          use: [
            'style-loader',
            'css-loader',
            {
              loader: 'less-loader',
              options: {
                lessOptions: {
                  modifyVars: {
                    hack: `true; @import "${paths.variableOverride}";`
                  },
                  javascriptEnabled: true
                }
              }
            }
          ]
        },
        // Images: Copy image files to build folder
        {
          test: /\.(?:ico|gif|png|jpg|jpeg|bmp)$/i,
          loader: require.resolve('file-loader'),
          options: {
            name: 'assets/images/[name].[ext]'
          }
        },
        // Fonts: copy font files to build folder
        {
          test: /\.(woff(2)?|eot|ttf|otf|)$/,
          loader: require.resolve('file-loader'),
          options: {
            name: 'assets/fonts/[name].[ext]'
          }
        },
        // Webpack loader that lets you use SVG files as Vue components
        {
          test: /\.svg$/,
          use: ['vue-loader', 'vue-svg-loader']
        }
      ]
    },

    resolve: {
      modules: [
        paths.appSrc,
        paths.appNodeModules
      ],
      extensions: ['.vue', '.js', '.json'],
      alias: {
        '@': paths.appSrc,
        vue: '@vue/runtime-dom'
      },
      plugins: []
    }
  }
}
