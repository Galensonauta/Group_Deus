const sequelize = require('./db');

const express = require('express'); // Requiere librería express
const { json } = express; // Extrae 'json' del módulo 'express'
const cors = require('cors');
const routerApi = require('./routes/index.js');
require('dotenv').config();
const { checkApiKey } = require('./middlewares/authHandler.js');


const cookieParser = require('cookie-parser');
const path = require('path');


// Acceder a la arquitectura
// Requiere los middlewares desde el archivo
const { logErrors, 
  errorHandler, 
  boomErrorHandler, 
  ormErrorHandler } = require('./middlewares/errorHandler.js');

const app = express(); // Crear instancia de aplicacion de express


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


app.get('/nueva-ruta', checkApiKey,(req, res) => {
  // Respuesta al cliente
     res.send('Hola , soy una nueva ruta');
   });
  
   // Ruta para cualquier solicitud no manejada
   app.get('*', (req, res) => {
     res.sendFile(path.join(__dirname, 'dist', 'index.html'));
   });
   
// const passport=
require("./utils/auth")
// app.use(passport.initialize());
routerApi(app);
app.use(logErrors)
app.use(ormErrorHandler)
app.use(boomErrorHandler)
app.use(errorHandler)
// Middleware para servir archivos estáticos del frontend
app.use(express.static(path.join(__dirname, 'dist')));

// Manejo de inicio en entorno local
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    sequelize.authenticate()
      .then(() => console.log('Conexión a la base de datos exitosa'))
      .catch(err => console.error('Error al conectar a la base de datos:', err));
  });
}


module.exports = app; // Asegúrate de exportar la app aquí



