const sequelize = require('../libs/sequelize.js');
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
const routerApi = require('./routes.js');
const { checkApiKey } = require('../middlewares/authHandler.js');
const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('../middlewares/errorHandler.js');
require("../utils/auth");
const passport = require('passport');

app.use(passport.initialize()); // Para inicializar Passport


const app = express(); // Crear instancia de aplicación de Express
// Logs iniciales

console.log('Servidor Express inicializado');
// Middlewares globales
// app.disable('x-powered-by'); // Ocultar tecnología usada
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
// app.use((req, res, next) => {
//   console.log(`Ruta llamada: ${req.method} ${req.url}`);
//   next();
// });
// Registro de rutas de API
routerApi(app);
console.log('Rutas inicializadas');
// Rutas adicionales
app.get('/nueva-ruta', checkApiKey, (req, res) => {
  res.send('Hola, soy una nueva ruta');
});
// Middleware de manejo de archivos estáticos
app.use(express.static(path.join(__dirname, '../')));
// Ruta global para cualquier solicitud no manejada
app.get(/^(?!\/api).*$/, (req, res) => {
  res.sendFile(path.join(__dirname, '../', 'index.html'));
});
// Middlewares de manejo de errores
app.use(logErrors);
app.use(ormErrorHandler);
app.use(boomErrorHandler);
app.use(errorHandler);
app.use(errorHandler(process.env.NODE_ENV));

// Iniciar servidor solo en entorno local
if (require.main === module) {
  const port = process.env.PORT || 3000;
  app.listen(port, (err) => {
    if(err){
      console.error('Error al iniciar el servidor:', err);
      process.exit(1);
    }
    console.log(`Servidor corriendo en el puerto ${port}`);    
  });
}

// Exportar la aplicación para serverless o testing
module.exports = app;



// const app = require('../index'); // Importa el archivo principal de Express
// // Log básico para verificar si la app se importa correctamente
// console.log('App importada correctamente. Rutas configuradas:');
// app._router.stack.forEach((r) => {
//   if (r.route && r.route.path) {
//     console.log(`Ruta registrada: ${r.route.path}`);
//   }
// });
// module.exports = app; // Exporta la app como módulo

