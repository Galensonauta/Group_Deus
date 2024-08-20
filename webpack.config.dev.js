const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyPlugin = require('copy-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin; 

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/navigation.js",
  // Output nos permite decir hacia dónde va enviar lo que va a 
  //preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "[name].[contenthash].js",
  },  
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto 
    //para webpack los lea
    extensions: [".js"],
    alias:{
      "@styles": path.resolve(__dirname,"src/styles"),
      "@src":path.resolve(__dirname,"src")
    }
  },
  mode: "development",
  devtool:"source-map",
  module: {
     // REGLAS PARA TRABAJAR CON WEBPACK
    rules: [
      {
        // LEE LOS ARCHIVOS CON EXTENSION .JS,
        test: /\.m?js$/,
         // IGNORA LOS MODULOS DE LA CARPETA
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.css$/i, // Archivos CSS
        use: [
          MiniCssExtractPlugin.loader,  // Extrae el CSS en archivos separados
          'css-loader' 
        ],
      },
      
    ],
  },
  //seccion de plugins
  plugins: [
    new HtmlWebpackPlugin({ 
    inject: "body",
    template: './index.html',
    filename: './index.html'
}),
new MiniCssExtractPlugin({
  filename: '[name].[contenthash].css',  // Nombre del archivo CSS generado
}),
new CopyPlugin({
  patterns: [
    {
      from: path.resolve(__dirname, "src", "imagesDefault.js"),
      to: "assets/images"
    }
  ]
}),
new Dotenv({
  path: './.env.dev.local'}
),
new BundleAnalyzerPlugin(),
// INSTANCIAMOS EL PLUGIN
],
devServer: {
  static: 
  {
    directory: path.join(__dirname, "dist"),
    watch: true,
  },
  watchFiles: path.join(__dirname, "./**"), //observa los cambios en todos nuestros archivos y actualiza el navegador
  compress: true,
  historyApiFallback: true,
  port: 3006,
  open: true, //Hace que se abra en el navegador
  
},
}