const express = require('express'); // Requerir libreria express
const app = express(); // Crear instancia de aplicacion de express
const port = 3001; // Puerto en el que se ejecutara el servidor

// Enrutador de la aplicacion
/**
 * req : parametro que contiene toda lo necesario de la petición desde el cliente
 * res : parametro que contiene todo lo necesario para responder al cliente
 */
// ...
// Enrutamiento
app.get('/', (req, res) => {
    // Respuesta al cliente
    res.send('Hola mi server en express');
  });
  
  app.get('/nueva-ruta', (req, res) => {
    // Respuesta al cliente
    res.send('Hola , soy una nueva ruta');
  });
  
  app.get('/products', (req, res) => {
    // Respuesta al cliente
    res.json({
      name: 'Producto 1',
      price: 1000,
    });
  });
// Escuchar en que puerto se ejecutara el servidor
app.listen(port, () => {
  console.log(`El servidor esta corriendo en el puerto ${port}`);
});


