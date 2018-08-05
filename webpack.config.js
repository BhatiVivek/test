var path = require("path");
var webpack = require("webpack");
var HtmlWebpackPlugin = require('html-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  resolve: {
      extensions: ['*', '.js', '.jsx']
  },
  entry: {
    app: ['./src/index.js'],
    vendor: ['react', 'react-dom'],
  },
  output: {
    path: __dirname,
    publicPath: '/',
    filename: 'bundle.js'
  },
  devServer: {
    contentBase: './',
    inline: true,
    host: 'localhost',
    port: 3011,
    historyApiFallback: true
  },
  devtool: 'cheap-module-source-map',
  module: {
		loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['react', 'es2015', 'stage-1']
        }
      },
      {
                test: /\.scss/,
                loader: 'style-loader!css-loader!sass-loader'
      },
      {
       test: /\.css$/,
       use: ["style-loader", {
           loader: "css-loader",
           options: {
             modules: true,
             sourceMap: true,
             import: false,
             importLoaders: 1,
             localIdentName: "[name]--[local]--[hash:base64:8]"
           }
         },
         "postcss-loader" // has separate config, see postcss.config.js nearby
       ]
     },
     {
               test: /\.(png|jpe?g|gif|svg)$/,
               loader: 'url?limit=35000'
           },
           { test: /\.eot(\?\S*)?$/, loader: 'url-loader?limit=100000&mimetype=application/vnd.ms-fontobject' },
           { test: /\.woff2(\?\S*)?$/, loader: 'url-loader?limit=100000&mimetype=application/font-woff2' },
           { test: /\.woff(\?\S*)?$/, loader: 'url-loader?limit=100000&mimetype=application/font-woff' },
           { test: /\.ttf(\?\S*)?$/, loader: 'url-loader?limit=100000&mimetype=application/font-ttf' }
		]
	},
  plugins:[
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true,
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeRedundantAttributes: true,
        useShortDoctype: true,
        removeEmptyAttributes: true,
        removeStyleLinkTypeAttributes: true,
        keepClosingSlash: true,
        minifyJS: true,
        minifyCSS: true,
        minifyURLs: true,
      }
    }),
    new webpack.DefinePlugin({
      'process.env.NODE_ENV': JSON.stringify('development')
    }),
    new webpack.optimize.CommonsChunkPlugin({ name: 'vendor', filename: 'vendor.bundle.js' }),
    new webpack.NamedModulesPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        beautify: false,
        mangle: {
          screw_ie8: true,
          keep_fnames: true
        },
        compress: {
            warnings: false,
            screw_ie8: true,
            conditionals: true,
            unused: true,
            comparisons: true,
            sequences: true,
            dead_code: true,
            evaluate: true,
            if_return: true,
            join_vars: true,
            drop_console: false
        },
        comments: false,
      }),
    new CompressionPlugin({
            asset: "[path].gz[query]",
            algorithm: "gzip",
            test: /\.(js|html|htm)$/,
            threshold: 10240,
            minRatio: 0.8
    }),
  ]
}
