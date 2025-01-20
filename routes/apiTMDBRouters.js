const express = require('express');
const axios = require('axios');
const router = express.Router();
// const { config } = require('../config/config');

//  this.api = axios.create({
//         baseURL: 'https://api.themoviedb.org/3/',
//         headers: {
//           'Content-Type': 'application/json;charset=utf-8',
//           Authorization: apiTMDB,
//         },
//       })    
    //   const baseUrl = "https://api.themoviedb.org/3"
      const apiTMDB  = process.env.API_KEY


    //   '/watch/providers/movie',
// Proxy para obtener proveedores de películas
router.get('/providers', async (req, res, next) => {
  try {
    const response = await axios.get("https://api.themoviedb.org/3/watch/providers/regions?language=en-US",
      {
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
            Authorization: apiTMDB,
          },
      }
    );
    res.json(response.data); // Enviar los datos al frontend
  } catch (error) {
    console.error('Error al obtener proveedores:', error.message);
    next(error); // Manejar errores
  }
});

module.exports = router;