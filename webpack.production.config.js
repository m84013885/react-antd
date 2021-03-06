const path = require('path')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const nodeModuleDir = path.resolve(__dirname, 'node_module')
// 这里需要根据服务器来更改，
const publicPath = ''
module.exports = {
  performance: { maxEntrypointSize: 400000 },
  entry: {
    app: [path.resolve(__dirname, 'app/main.js')]
  },
  output: {
    path: path.resolve(__dirname, '../public'),
    chunkFilename: '[name].[chunkhash:5].js',
    publicPath: `${publicPath}/`,
    filename: '[name].[chunkhash:5].js'
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: ['babel-loader'],
      include: [path.resolve(__dirname, 'app')],
      exclude: [nodeModuleDir]
    },
    {
      test: /\.css$/,
      exclude: path.resolve(__dirname, 'app/router/builder/app'),
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            ident: 'postcss',
            config: { path: path.resolve(__dirname, 'dev/postcss.config.js') }
          }
        }],
      include: [path.resolve(__dirname, 'app'), /[\\/]node_modules[\\/].*antd/, /[\\/]node_modules[\\/].*react-lz-editor/, /[\\/]node_modules[\\/].*react-draft-wysiwyg/, /[\\/]node_modules[\\/].*react-lz-editor/, /[\\/]node_modules[\\/].*cropperjs/]
    },
    {
      test: /\.css$/,
      include: path.resolve(__dirname, 'app/router/builder/app'),
      use: [
        MiniCssExtractPlugin.loader,
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
      test: /\.(png|woff|woff2|eot|ttf|svg)$/,
      use: [{ loader: 'url-loader?limit=25000&name=[name].[ext]&outputPath=/images&publicPath=/images' }],
      include: [path.resolve(__dirname, 'app'), /[\\/]node_modules[\\/].*react-lz-editor/, /[\\/]node_modules[\\/].*react-draft-wysiwyg/, /[\\/]node_modules[\\/].*cropperjs/]
    }
    ]
  },
  mode: 'production',
  // 4.0 之后分代码
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          compress: { drop_console: true },
          output: { comments: false }
        }
      }),
      new OptimizeCSSAssetsPlugin({})
    ],
    splitChunks: {}
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[hash].css'
    }),
    new HtmlWebpackPlugin({
      filename: '../view/index.html',
      title: 'demo',
      template: 'app/index.html',
      inject: true,
      chunks: ['app']
    })
  ]
}
