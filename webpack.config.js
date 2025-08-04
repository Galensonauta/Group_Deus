

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
const webpack = require('webpack');

// module.exports = {
//   mode: 'production', // O 'development' si estás en modo de desarrollo
//   // resto de la configuración
// };

module.exports = {
  mode: 'production', // O 'development' si estás en modo de desarrollo
entry: "./src/main.mjs",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
    publicPath: '/',
  },
  resolve: {
    extensions: [".js",".mjs"],
    alias: {
      "@imagesDefault": resolve(__dirname, "src/imagesDefault.mjs"),
      "@styles": resolve(__dirname, "src/styles"),
      "@src": resolve(__dirname, "src")
    },
    fallback: {
      "crypto": require.resolve("crypto-browserify"),
      "http": require.resolve("stream-http"),
      "url": require.resolve("url/"),
      "path": require.resolve("path-browserify"),
      "stream": require.resolve("stream-browserify"),
      "fs": false,  // Desactivar fs (sistema de archivos)
      "net": false,  // Desactivar net (sockets)
      "tls": false,  // Desactivar tls (cifrado)
      buffer: require.resolve('buffer/'),

        }
  },
  optimization: {
    minimize: true,
    minimizer: [
      new CssMinimizerPlugin(),
      new TerserPlugin()
    ]
  },
  module: {
    rules: [
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader'
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: "body",
      template: './index.html',
      filename: './index.html'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[contenthash].css',
    }),
    new CopyPlugin({
      patterns: [
        {
          from: resolve(__dirname, "src", "imagesDefault.mjs"),
          to: "assets/images"
        }
      ]
    }),
    new  Dotenv({
      path: './.env',
      systemvars: true, // Incluye variables del sistema
    }),
    new CleanWebpackPlugin(),
    new NodePolyfillPlugin(),
    new webpack.ProvidePlugin({
      Buffer: ['buffer', 'Buffer'],
    }),
  ],
};
