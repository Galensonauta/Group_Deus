const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

module.exports = {
  // Entry nos permite decir el punto de entrada de nuestra aplicación
  entry: "./src/main.js",
  // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
  output: {
    // path es donde estará la carpeta donde se guardará los archivos
    // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
    path: path.resolve(__dirname, "dist"),
    // filename le pone el nombre al archivo final
    filename: "main.js"
  },
  resolve: {
    // Aqui ponemos las extensiones que tendremos en nuestro proyecto 
    //para webpack los lea
    extensions: [".js"]
  },
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
        test: /\.css|.styl$/i,
        use: [ MiniCssExtractPlugin.loader, 'css-loader' , 'stylus-loader' ]
    }
    ],
  },
  //seccion de plugins
  plugins: [
    new HtmlWebpackPlugin({ 
    inject: 'body',
    template: './index.html',
    filename: './index.html'
}),
new MiniCssExtractPlugin() 
// INSTANCIAMOS EL PLUGIN
]
}