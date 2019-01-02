const webpack = require('webpack')
const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
const publicPath = '/'
const entry = path.resolve(__dirname, './app/router/builder/render.js')
const outputPath = path.resolve(__dirname, './lib-build-dev')
const htmlTemplate = './builder/template-lib.html'
module.exports = {
  // performance: { maxEntrypointSize: 400000 },
  devtool: 'eval',
  entry: {
    app: entry
  },
  output: {
    path: outputPath,
    chunkFilename: '[name].[chunkhash:5].js',
    publicPath: publicPath,
    filename: '[name].[chunkhash:5].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      exclude: /node_module/
    },
    {
      test: /\.css$/,
      include: path.resolve(__dirname, './app/router/builder/'),
      use: [
        { loader: 'style-loader' },
        {
          loader: 'css-loader',
          options: {
            modules: true,
            importLoaders: 1,
            localIdentName: '[local]__[hash:base64:5]'
          }
        },
        { loader: 'postcss-loader' }
      ]
    },
    {
      test: /\.(png|jpg|gif)$/i,
      use: [
        {
          loader: 'url-loader',
          options: {
            limit: 8192
          }
        }
      ]
    }]
  },
  mode: 'development',
  devServer: {
    contentBase: outputPath,
    port: 9099,
    host: '0.0.0.0'
  },
  // optimization: {
  //   minimizer: [
  //     new UglifyJsPlugin({
  //       cache: true,
  //       parallel: true,
  //       sourceMap: true,
  //       uglifyOptions: {
  //         compress: { drop_console: true },
  //         output: { comments: false }
  //       }
  //     })
  //   ],
  //   splitChunks: {}
  // },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'demo',
      template: htmlTemplate,
      inject: true
    })
  ]
}
