const { resolve }  =  require('path')
const { readFileSync } = require('fs')
const tsImportPluginFactory = require('ts-import-plugin')
const { name } = require('../package.json')
const cookie = require('cookie')

const APP_DIR = resolve(__dirname, '../src')
const BUILD_DIR = resolve(__dirname, '../dist', `${name}`)

module.exports = (env, { mode }) => ({
  devtool: 'cheap-module-source-map',
  entry: [resolve(APP_DIR, 'index.tsx')],
  mode: mode || 'development',
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
  optimization: {
    splitChunks: {
      chunks: 'all',
      cacheGroups: {
        reactDom: {
          enforce: true,
          name: 'react-dom',
          priority: -1,
          test: /[\\/]node_modules[\\/].*(react-dom).*[\\/]/
        },
        react: {
          enforce: true,
          name: 'react',
          priority: -2,
          test: /[\\/]node_modules[\\/].*(react).*[\\/]/
        },
        apollo: {
          enforce: true,
          name: 'apollo',
          priority: -3,
          test: /[\\/]node_modules[\\/].*(apollo|graphql).*[\\/]/
          
        },
        commons: {
          enforce: true,
          name: 'vendors',
          priority: -5,
          test: /[\\/]node_modules[\\/]/
        }
      }
    }
  },
  output: {
    chunkFilename: '[name].js',
    filename: '[name].js',
    path: BUILD_DIR,
    publicPath: `/${name}`
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  target: 'web'
})
