const express = require('express');
const serverless = require('serverless-http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const path = require('path');
require('dotenv').config();
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
const usersRoutes= require("./users.js")
// Registro de rutas de API
 app.use("/",usersRoutes)

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
// module.exports = app;
module.exports = serverless(app);


