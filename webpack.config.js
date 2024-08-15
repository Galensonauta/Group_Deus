const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

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
    filename: "index.js",
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
        test: /\.css$/i, // Archivos CSS
        use: [
          MiniCssExtractPlugin.loader,  // Extrae el CSS en archivos separados
          'css-loader' 
        ],
      }
    ],
  },
  //seccion de plugins
  plugins: [
    new HtmlWebpackPlugin({ 
    inject: true,
    template: './index.html',
    filename: './index.html'
}),
new MiniCssExtractPlugin({
  filename: 'main.css',  // Nombre del archivo CSS generado
}),
// INSTANCIAMOS EL PLUGIN
]
}