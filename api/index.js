const express = require('express');
const app = express();

// Middleware básico
app.use(express.json());

// Endpoint de prueba
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API funcionando correctamente en Vercel' });
});

// Exporta la app
module.exports = app;
