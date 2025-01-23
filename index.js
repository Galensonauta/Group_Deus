const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const routerApi = require('./routes/index.js');
const { checkApiKey } = require('./middlewares/authHandler.js');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler.js');
const passport = require('passport');
require('./utils/auth'); // Asegúrate de importar las estrategias

const cookieParser = require('cookie-parser');


const port = process.env.PORT || 3000;
const app = express(); // Crear instancia de aplicación de Express

// Logs iniciales
console.log('Servidor Express inicializado');

// Middlewares globales
app.use(express.json()); // Parsear JSON
app.use(cookieParser());
app.use(passport.initialize());

// Configuración de CORS
const whiteList = ["https://group-deus.vercel.app","https://group-deus-backend-express.onrender.com"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {      
      console.error('Origen no permitido por CORS:', origin);
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
};

app.use(cors(corsOptions));
// Registro de rutas de API
routerApi(app);
console.log('Rutas inicializadas');

// Registro de logs de rutas
app.use((req, res, next) => {
  console.log(`Ruta llamada: ${req.method} ${req.url}`);
  next();
});


// Rutas adicionales
app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});

// Middleware de manejo de archivos estáticos
app.use(express.static(path.join(__dirname, 'dist')));

// Ruta global para cualquier solicitud no manejada
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

// Middlewares de manejo de errores
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);

// Iniciar servidor solo en entorno local

  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
})

// Exportar la aplicación para serverless o testing
module.exports = app;
