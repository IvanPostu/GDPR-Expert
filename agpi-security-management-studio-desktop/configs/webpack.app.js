const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = [

  {
    mode: 'development',
    entry: './src/app/index.tsx',
    target: 'electron-renderer',
    devtool: 'source-map',
    module: { rules: [{
      test: /\.ts(x?)$/,
      include: /src/,
      use: [{ loader: 'ts-loader' }]
    }] },
    output: {
      path:  path.resolve(__dirname, '..', 'build', 'app'),
      filename: 'react.js'
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: './src/app/index.html'
      })
    ]
  }
];