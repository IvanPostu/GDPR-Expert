/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path')

module.exports = [
  {
    mode: 'production',

    entry: './src/electron/electron.ts',

    target: 'electron-main',

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
