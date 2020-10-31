/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const OptimizeCssAssetWebpackPlugin = require('optimize-css-assets-webpack-plugin')
const TerserWebpackPlugin = require('terser-webpack-plugin')
const { SourceMapDevToolPlugin } = require('webpack')

const isDev = process.env.NODE_ENV === 'development'
const isProd = !isDev

const PATH_TO_SRC_FOLDER = path.resolve(__dirname, '..', 'src')

module.exports = [
  {
    mode: process.env.NODE_ENV,

    entry: './src/app/main/index.tsx',

    output: {
      path: path.resolve(__dirname, '..', 'build', 'app'),
      filename: '[name].bundle.js',
      chunkFilename: '[name]_chunk.js',
    },

    target: 'electron-renderer',

    devtool: false,

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@': PATH_TO_SRC_FOLDER,
      },
    },

    plugins: [
      new HtmlWebpackPlugin({
        template: './src/app/main/index.html',
      }),
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin(),
      ...(isDev
        ? [
            new SourceMapDevToolPlugin({
              filename: '[file].map',
              exclude: ['vendor', 'polyfill'],
              columns: false,
              module: true,
            }),
          ]
        : []),
    ],

    devServer: isDev
      ? {
          host: false,
          port: 8000,
          hot: true,
          overlay: true,
          historyApiFallback: true,
          writeToDisk: false,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
            'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
          },
        }
      : {},

    ...(isProd
      ? {
          optimization: {
            splitChunks: {
              cacheGroups: {
                commons: {
                  test: /[\\/]node_modules[\\/]/,
                  name: 'vendors',
                  chunks: 'all',
                },
              },
            },
            minimizer: isProd
              ? [new OptimizeCssAssetWebpackPlugin(), new TerserWebpackPlugin()]
              : [],
          },
        }
      : {}),

    module: {
      rules: [
        {
          test: /\.ts(x?)$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
  },
]
