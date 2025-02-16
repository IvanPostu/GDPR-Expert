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

const sassRegex = /\.(scss|sass)$/
const sassModuleRegex = /\.module\.(scss|sass)$/
const cssRegex = /\.css$/
const cssModuleRegex = /\.module\.css$/

const PATH_TO_SRC_FOLDER = path.resolve(__dirname, '..', 'src')

module.exports = [
  {
    mode: process.env.NODE_ENV,

    entry: './src/app/main/index.ts',

    output: {
      path: path.resolve(__dirname, '..', 'build', 'app'),
      filename: '[name].bundle.js',
      chunkFilename: '[name]_chunk.js',
    },

    target: 'electron-renderer',

    devtool: isDev ? 'source-map' : false,

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

      new MiniCssExtractPlugin(),
      ...(isDev
        ? [
            // new SourceMapDevToolPlugin({
            //   filename: '[file].map',
            //   exclude: ['vendor', 'polyfill'],
            //   columns: false,
            //   module: true,
            // }),
          ]
        : [new CleanWebpackPlugin()]),
    ],

    devServer: isDev
      ? {
          compress: true,
          port: 8000,
          hot: true,
          inline: true,
          liveReload: false,
          writeToDisk: true,
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': '*',
            'Access-Control-Allow-Headers': '*',
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
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },

        {
          test: sassRegex,
          exclude: sassModuleRegex,
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            ...(isDev ? [] : ['postcss-loader']),
            'sass-loader',
          ],
        },
        {
          test: sassModuleRegex,
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64]',
                },
                sourceMap: isDev,
              },
            },
            ...(isDev ? [] : ['postcss-loader']),
            'sass-loader',
          ],
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
            },
            ...(isDev ? [] : ['postcss-loader']),
          ],
        },
        {
          test: cssModuleRegex,
          use: [
            {
              loader: isProd ? MiniCssExtractPlugin.loader : 'style-loader',
            },
            {
              loader: 'css-loader',
              options: {
                modules: {
                  localIdentName: isDev ? '[path][name]__[local]' : '[hash:base64]',
                },
                sourceMap: isDev,
              },
            },
            ...(isDev ? [] : ['postcss-loader']),
          ],
        },
        {
          test: /\.(png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(ttf)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
      ],
    },
  },
]
