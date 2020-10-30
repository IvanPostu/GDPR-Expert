const path = require('path')

module.exports = [
  {
    mode: 'development',
    entry: './src/electron/electron.ts',
    target: 'electron-main',
    module: {
      rules: [{
        test: /\.ts$/,
        include: /src/,
        use: [{ loader: 'ts-loader' }]
      }]
    },
    output: {
      path: path.resolve(__dirname, '..', 'build', 'electron'),
      filename: 'electron.js'
    }
  },
]