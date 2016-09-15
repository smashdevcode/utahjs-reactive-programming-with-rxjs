const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outputPath = path.join(__dirname, '/wwwroot');

module.exports = {
    entry: {
      main: './Client/main.ts',
      polyfills: './Client/imports/polyfills.ts',
      vendor: './Client/imports/vendor.ts'
    },
    output: {
        path: outputPath,
        filename: 'js/[name].bundle.js'
    },
    resolve: {
      extensions: ['', '.ts', '.js']
    },
    module: {
      loaders: [
        { 
          test: /\.ts$/, 
          loader: 'ts-loader' 
        },
        {
          test: /component\.html$|\.jpe?g$|\.gif$|\.png$|\.svg$|\.woff$|\.ttf$|\.wav$|\.mp3$/,
          loader: 'file'
        }
      ]
    },
    plugins: [
      new CleanWebpackPlugin([outputPath], {
        // Without `root` CleanWebpackPlugin won't point to our
        // project and will fail to work.
        root: process.cwd()
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: ['main', 'vendor', 'polyfills']
      }),
      new HtmlWebpackPlugin({
        template: 'Client/index.html'
      })
    ]
};