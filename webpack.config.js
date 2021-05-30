const CopyPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpack = require('webpack');
const path = require('path');


const config = {
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  entry: {
    index: './src/assets/index.js',
    sw: './src/assets/sw.js',
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: './src/images',
          to: './images'
        },
      ],
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/pages/index.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'page.html',
      template: './src/pages/page.html',
      inject: false,
    }),
    new HtmlWebpackPlugin({
      filename: 'offline.html',
      template: './src/pages/offline.html',
      inject: false,
    }),
  ],
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  }
};


module.exports = config;
