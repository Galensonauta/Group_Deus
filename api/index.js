const express = require('express');
const app = require("../index");

// Middleware básico
app.use(express.json());

// Endpoint de prueba
app.get('/', (req, res) => {
  res.status(200).json({ message: 'API funcionando correctamente en Vercel' });
});

// Exporta la app
module.exports = app;
