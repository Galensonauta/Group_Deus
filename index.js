
const express = require('express'); // Requiere librería express
const { json } = express; // Extrae 'json' del módulo 'express'
const cors = require('cors');
const routerApi = require('./routes/index.js');
require('dotenv').config();
const { checkApiKey } = require('./middlewares/authHandler.js');

const cookieParser = require('cookie-parser');

// Acceder a la arquitectura
// Requiere los middlewares desde el archivo
const { logErrors, 
  errorHandler, 
  boomErrorHandler, 
  ormErrorHandler } = require('./middlewares/errorHandler.js');

const app = express(); // Crear instancia de aplicacion de express


const port = process.env.PORT || 3001;
app.use(cookieParser());

app.use(json())
const whiteList=["http://localhost:8080","https://group-deus.vercel.app"]
const options={
  origin: (origin, callback)=>{
    if(whiteList.includes(origin)||!origin){
      callback(null,true)
    }else{
      callback(new Error("No permitido"))
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
}
app.use(cors(options))
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', 'https://group-deus-guyhg1ly0-galensos-projects.vercel.app'); // Allow only your specific origin
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE'); // Specify allowed methods
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization'); // Specify allowed headers
  next();
});



app.get('/nueva-ruta', checkApiKey,(req, res) => {
  // Respuesta al cliente
     res.send('Hola , soy una nueva ruta');
   });
  

// const passport=
require("./utils/auth")
// app.use(passport.initialize());
routerApi(app);
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)

// Escuchar en que puerto se ejecutara el servidor
app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${port}`);
  console.log(process.env.NODE_ENV)
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
// 




