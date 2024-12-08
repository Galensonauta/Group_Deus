const sequelize = require('./libs/sequelize.js');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();

const routerApi = require('./routes/index.js');
const { checkApiKey } = require('./middlewares/authHandler.js');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/errorHandler.js');
require("./utils/auth");

const app = express(); // Crear instancia de aplicación de Express

// Logs iniciales
console.log('Servidor Express inicializado');

// Middlewares globales
app.use(express.json()); // Parsear JSON
app.use(cookieParser()); // Manejar cookies

// Configuración de CORS
const whiteList = ["http://localhost:8080", "https://group-deus.vercel.app"];
const corsOptions = {
  origin: (origin, callback) => {
    if (whiteList.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("No permitido por CORS"));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PATCH', 'DELETE']
};
app.use(cors(corsOptions));

// Registro de logs de rutas
app.use((req, res, next) => {
  console.log(`Ruta llamada: ${req.method} ${req.url}`);
  next();
});

// Registro de rutas de API
routerApi(app);
console.log('Rutas inicializadas');

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
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, () => {
    console.log(`Servidor corriendo en el puerto ${port}`);
    sequelize.authenticate()
      .then(() => console.log('Conexión a la base de datos exitosa'))
      .catch(err => console.error('Error al conectar a la base de datos:', err));
  });
}

// Exportar la aplicación para serverless o testing
module.exports = app;
