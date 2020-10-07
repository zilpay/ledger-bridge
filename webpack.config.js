const webpack = require('webpack')
const TerserPlugin = require('terser-webpack-plugin');

const mode = process.env.NODE_ENV || 'development'

module.exports = {
  entry: './lib/index.js',
  devtool: 'source-map',
  target: 'web',
  optimization: {
    minimizer: [
      new TerserPlugin({
        sourceMap: true,
        cache: true,
        parallel: true,
        terserOptions: {
          mangle: false,
          keep_classnames: true,
          keep_fnames: true,
          output: {
            comments: false
          }
        }
      }),
    ]
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env'],
            plugins: ['@babel/plugin-transform-runtime']
          }
        }
      }
    ]
  },
  resolve: {
    modules: ['./node_modules']
  },
  plugins: [
    new webpack.DefinePlugin({
      ENVIRONMENT: JSON.stringify(mode)
    })
  ],
  mode
}
