/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

const PATH_TO_SRC_FOLDER = path.resolve(__dirname, '..', 'src')

module.exports = [
  {
    mode: 'production',

    entry: './src/electron/electron.ts',

    target: 'electron-main',

    resolve: {
      extensions: ['.ts', '.tsx', '.js'],
      alias: {
        '@': PATH_TO_SRC_FOLDER,
      },
    },

    output: {
      path: path.resolve(__dirname, '..', 'build', 'electron'),
      filename: 'electron.js',
    },

    module: {
      rules: [
        {
          test: /\.ts$/,
          include: /src/,
          use: [{ loader: 'ts-loader' }],
        },
      ],
    },
  },
]
