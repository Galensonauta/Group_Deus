const express = require('express');
const axios = require('axios');
const router = express.Router();

      const apiTMDB  = process.env.API_KEY
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
      router.get('genre/:media/list', async (req, res, next) => {
        try {
          const{media}=req.params
          const response = await axios.get(`https://api.themoviedb.org/3/genre/${media}/list`,
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
      router.get('configuration/countries?language=es-LA', async (req, res, next) => {
        try {
          const response = await axios.get(`https://api.themoviedb.org/3/configuration/countries?language=es-LA`,
            {
              headers: {
                  'Content-Type': 'application/json;charset=utf-8',
                  Authorization: apiTMDB,
                },
            }
          );res.json(response.data); // Enviar los datos al frontend
        } catch (error) {
          console.error('Error al obtener proveedores:', error.message);
          next(error); // Manejar errores
        }
      });            
      router.get('trending/:media/day', async (req, res, next) => {
        try {
            const media= req.params
          const response = await axios.get(`https://api.themoviedb.org/3/trending/${media}/day`,
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
      router.get(':media/top_rated', async (req, res, next) => {
        try {
            const media= req.params
          const response = await axios.get(`https://api.themoviedb.org/3/${media}/top_rated`,
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
    
        router.get('discover/movie/:id', async (req, res, next) => {
            try {
                const id = req.params
           //conectar id de cast con la ruta del back     
              const response = await axios.get(`https://api.themoviedb.org/3/discover/movie`,
                {
                  headers: {
                      'Content-Type': 'application/json;charset=utf-8',
                      Authorization: apiTMDB,
                    },
                    params:{                    
                        with_cast: id
                    }
                }
              );
              res.json(response.data); // Enviar los datos al frontend
            } catch (error) {
              console.error('Error al obtener proveedores:', error.message);
              next(error); // Manejar errores
            }
          });
    
        router.get('person/:id/tv_credits', async (req, res, next) => {
            try {
                const id = req.params
           //conectar id de cast con la ruta del back     
              const response = await axios.get(`https://api.themoviedb.org/person/${id}/tv_credits`,
                {
                  headers: {
                      'Content-Type': 'application/json;charset=utf-8',
                      Authorization: apiTMDB,
                    },
                    params:{                    
                        with_cast: id
                    }
                }
              );
              res.json(response.data); // Enviar los datos al frontend
            } catch (error) {
              console.error('Error al obtener proveedores:', error.message);
              next(error); // Manejar errores
            }
          });
    router.get('/:type/:id', async (req, res, next) => {
        try {
          const{type,id}=req.params
          const response = await axios.get(`https://api.themoviedb.org/3/${type}/${id}`,
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
