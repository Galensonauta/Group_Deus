const express = require('express'); // Requerir libreria express
const cors=require("cors")
const routerApi = require('./routes');

const { logErrors, errorHandler, boomErrorHandler } = require("./middlewares/errorHandler")

const app = express(); // Crear instancia de aplicacion de express
const port = 3001; // Puerto en el que se ejecutara el servidor

app.use(express.json())
const whiteList=["http://localhost:3001"]
const options={
  origin: (origin, callback)=>{
    if(whiteList.includes(origin)||!origin){
      callback(null,true)
    }else{
      callback(new Error("No permitido"))
    }
  }
}
app.use(cors(options))
routerApi(app);

app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

// Escuchar en que puerto se ejecutara el servidor
app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${port}`);
});


// Enrutador de la aplicacion
/**
 * req : parametro que contiene toda lo necesario de la petición desde el cliente
 * res : parametro que contiene todo lo necesario para responder al cliente
 */
// ...
// Enrutamiento
// app.get('/', (req, res) => {
//     // Respuesta al cliente
//     res.send('Hola mi server en express');
//   });
//   app.get('/nueva-ruta', (req, res) => {
//     // Respuesta al cliente
//     res.send('Hola , soy una nueva ruta');
//   });





