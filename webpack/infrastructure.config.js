const { join, resolve }  =  require('path')
const slsw  = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')

module.exports = {
  entry: slsw.lib.entries,
  externals: [nodeExternals()],
  mode: 'production',
  module: {
    rules: [{
      test: /\.ts$/,
      use: [
        {
          loader: 'ts-loader',
          options: {
            configFile: resolve(__dirname, '../tsconfig.json')
          }
        }
      ]
    }]
  },
  output: {
    filename: '[name].js',
    libraryTarget: 'commonjs',
    path: join(__dirname, '../.webpack')
  },
  resolve: {
    extensions: ['.js', '.json', '.ts']
  },
  target: 'node'
}
