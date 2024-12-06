// import { resolve as _resolve, join } from 'path';
// import HtmlWebpackPlugin from 'html-webpack-plugin';
// import MiniCssExtractPlugin, { loader as _loader } from 'mini-css-extract-plugin';
// import CopyPlugin from 'copy-webpack-plugin';
// import Dotenv from 'dotenv-webpack';
// import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer'; 

// export const entry = "./src/navigation.js";
// export const output = {
//   // path es donde estará la carpeta donde se guardará los archivos
//   // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
//   path: _resolve(__dirname, "dist"),
//   // filename le pone el nombre al archivo final
//   filename: "[name].[contenthash].js",
// };
// export const resolve = {
//   // Aqui ponemos las extensiones que tendremos en nuestro proyecto 
//   //para webpack los lea
//   extensions: [".js","mjs","cjs"],
//   alias: {
//     "@styles": _resolve(__dirname, "src/styles"),
//     "@src": _resolve(__dirname, "src")
//   }
// };
// export const mode = "development";
// export const devtool = "source-map";
// export const module = {
//   // REGLAS PARA TRABAJAR CON WEBPACK
//   rules: [
//     {
//       // LEE LOS ARCHIVOS CON EXTENSION .JS,
//       test: /\.m?js$/,
//       // IGNORA LOS MODULOS DE LA CARPETA
//       exclude: /node_modules/,
//       use: {
//         loader: "babel-loader",
//       },
//     },
//     {
//       test: /\.css$/i, // Archivos CSS
//       use: [
//         _loader, // Extrae el CSS en archivos separados
//         'css-loader'
//       ],
//     },
//   ],
// };
// export const plugins = [
//   new HtmlWebpackPlugin({
//     inject: "body",
//     template: './index.html',
//     filename: './index.html'
//   }),
//   new MiniCssExtractPlugin({
//     filename: '[name].[contenthash].css', // Nombre del archivo CSS generado
//   }),
//   new CopyPlugin({
//     patterns: [
//       {
//         from: _resolve(__dirname, "src", "imagesDefault.js"),
//         to: "assets/images"
//       }
//     ]
//   }),
//   new Dotenv({
//     path: './.env.dev.local'
//   }
//   ),
//   new BundleAnalyzerPlugin(),
// ];
// export const devServer = {
//   static: {
//     directory: join(__dirname, "dist"),
//     watch: true,
//   },
//   watchFiles: join(__dirname, "./**"), //observa los cambios en todos nuestros archivos y actualiza el navegador
//   compress: true,
//   historyApiFallback: true,
//   port: 3006,
//   open: true, //Hace que se abra en el navegador
// };

// webpack.config.js

const { resolve } = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
// const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');
// const webpack = require('webpack');


module.exports = {
  mode: 'development', // O 'development' si estás en modo de desarrollo
  // resto de la configuración
};

module.exports = {
  entry: "./src/navigation.js",
  output: {
    path: resolve(__dirname, "dist"),
    filename: "[name].[contenthash].js",
  },
  resolve: {
    extensions: [".js",".mjs"],
    alias: {
      "@imagesDefault": resolve(__dirname, "src/imagesDefault.mjs"),
      "@styles": resolve(__dirname, "src/styles"),
      "@src": resolve(__dirname, "src")
    },
    // fallback: {
    //   "crypto": require.resolve("crypto-browserify"),
    //   "http": require.resolve("stream-http"),
    //   "url": require.resolve("url/"),
    //   "path": require.resolve("path-browserify"),
    //   "stream": require.resolve("stream-browserify"),
    //   process: require.resolve("process/browser"),
    //   "fs": false,  // Desactivar fs (sistema de archivos)
    //   "net": false,  // Desactivar net (sockets)
    //   "tls": false,  // Desactivar tls (cifrado)
    // }
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
    new Dotenv({ path: './.env' }),
    new CleanWebpackPlugin(),
    // new NodePolyfillPlugin(),
    // new webpack.ProvidePlugin({
    //   process: 'process/browser',  // Proporcionar el polyfill de process
    // }), 
  ],
};
