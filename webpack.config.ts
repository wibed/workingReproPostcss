import path from 'path';

import type { Configuration as WebpackConfiguration } from 'webpack';
import { Configuration as WebpackDevServerConfiguration } from 'webpack-dev-server'

import MiniCssExtractPlugin from "mini-css-extract-plugin";
import HtmlWebpackPlugin from "html-webpack-plugin";

interface Configuration extends WebpackConfiguration {
  devServer?: WebpackDevServerConfiguration
}


const clientConfiguration: Configuration = {
  name: "client",
  target: "es2022",
  entry: path.join(__dirname, "./src"),
  devtool: "source-map",
  devServer: {
    historyApiFallback: true,
    static: path.join(__dirname, "./dist"),
    open: true,
    compress: true,
    devMiddleware: { writeToDisk: true }
  },
  output: {
    publicPath: '/',
    path: path.join(__dirname, "./dist"),
    filename: '[name].bundle.js',
    assetModuleFilename: 'assets/[name][ext]',
    chunkFormat: 'commonjs'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.ts', '.tsx'],
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [
	            {
            loader: "ts-loader",
            options: { transpileOnly: true }
         }
        ]
      },
      {
        test: /\.svg$/,
        use: ['@svgr/webpack']
      },
      {
        test: /\.(css)$/i,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          { loader: "css-loader" }
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg)$/i,
        type: 'asset'
      },
      {
        test: /\.html$/,
        use: [{ loader: "html-loader", options: { minimize: true } }]
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: (
        true
          ? '[name].css'
          : '[name].[contenthash].css'
      )
    }),
    new HtmlWebpackPlugin({
      template: "public/index.html",
      filename: "index.html",
    })
  ],

  performance: {
    maxEntrypointSize: 512000,
    maxAssetSize: 512000
  },
  watchOptions: {
    aggregateTimeout: 500,
    poll: 1000,
  },
}

export default clientConfiguration
