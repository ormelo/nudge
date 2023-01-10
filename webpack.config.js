var webpack = require('webpack');
var path = require('path');

var BUILD_DIR = path.resolve(__dirname, 'public');
var WIZ_DIR = path.resolve(__dirname, 'src/client/wizard');
var PROC_DIR = path.resolve(__dirname, 'src/client/process');
var QUES_DIR = path.resolve(__dirname, 'src/client/questionnaire');
var UglifyJSPlugin = require('uglifyjs-webpack-plugin');
var CompressionPlugin = require('compression-webpack-plugin');
var BrotliPlugin = require('brotli-webpack-plugin');

var config = {
  entry: {
    guide: WIZ_DIR + '/guide.jsx',
    process: PROC_DIR + '/process.jsx',
    questionnaire: QUES_DIR + '/questionnaire.jsx'
  },
  output: {
    path: BUILD_DIR,
    filename: '[name].bundle.min.js',
    chunkFilename: "[id].chunk.js"
  },
  node: {
    fs: 'empty',
    target: 'empty'
  },
  module : {
    rules : [
      {
        test : /\.jsx?/,
        include : [WIZ_DIR, PROC_DIR, QUES_DIR],
        exclude: [/node_modules/],
        loader : 'babel',
        query:
        {
          presets: ['es2015','react']
        }
      },
      { test: /\.css$/, loader: "style-loader!css-loader" }
    ]
  },
  watch: true,
  resolveLoader: {
    moduleExtensions: ['-loader']
  },
  plugins: [
    new UglifyJSPlugin({
      minimize: true,
      compress: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new CompressionPlugin({
     filename: '[path].gz[query]',
     algorithm: 'gzip',
     test: /\.js$|\.css$|\.html$/,
     threshold: 10240,
     minRatio: 0.8
     }),
     new BrotliPlugin({
     asset: '[path].br[query]',
     test: /\.js$|\.css$|\.html$/,
     threshold: 10240,
     minRatio: 0.8
     })
  ]
};

module.exports = config;