const { resolve }  =  require('path')
const { readFileSync } = require('fs')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const tsImportPluginFactory = require('ts-import-plugin')
const { name } = require('../package.json')
const cookie = require('cookie')


const APP_DIR = resolve(__dirname, '../src')
const BUILD_DIR = resolve(__dirname, '../dist', `${name}`)

module.exports = (env, options) => ({
  devtool: 'cheap-module-source-map',
  entry: [resolve(APP_DIR, 'index.tsx')],
  externals: {
    react: 'React',
    'react-dom': 'ReactDOM',
  },
  mode: options.mode || 'development',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        loader: 'ts-loader',
        options: {
          configFile: resolve(__dirname, '../tsconfig.client.json')
        }
      }
    ]
  },
  output: {
    filename: `${name}.js`,
    path: BUILD_DIR,
    publicPath: `/${name}`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  target: 'web'
})
