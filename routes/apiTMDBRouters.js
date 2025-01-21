const express = require('express');
const axios = require('axios');
const router = express.Router();
const apiTMDB  = process.env.API_KEY
const api=axios.create({
        baseURL: 'https://api.themoviedb.org/3',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          Authorization: apiTMDB,
        },
      })  
      router.get('/providers', async (req, res, next) => {
        try {
          const response = await api("/providers/regions?language=en-US");
          res.json(response.data); // Enviar los datos al frontend
        } catch (error) {
          console.error('Error al obtener proveedores:', error.message);
          next(error); // Manejar errores
        }
      });
      router.get('/genre/:media/list', async (req, res, next) => {
        const{media}=req.params
        try {
          const response = await api(`/genre/${media}/list`);
          res.json(response.data); // Enviar los datos al frontend
        } catch (error) {
          console.error('Error al obtener proveedores:', error.message);
          next(error); // Manejar errores
        }
      });  
      router.get('/configuration/countries', async (req, res, next) => {
        try {
          const response = await api(`/configuration/countries?language=es-LA`)
          res.json(response.data); // Enviar los datos al frontend
        } catch (error) {
          console.error('Error al obtener proveedores:', error.message);
          next(error); // Manejar errores
        }
      });            
      router.get('/trending/:media/day', async (req, res, next) => {
        const media= req.params
        try {
          const response = await api(`/trending/${media}/day`);
          res.json(response.data); // Enviar los datos al frontend
        } catch (error) {
          console.error('Error al obtener proveedores:', error.message);
          next(error); // Manejar errores
        }
      });
      router.get('/:media/top_rated', async (req, res, next) => {
        const media= req.params
        try {
          const response = await api(`/${media}/top_rated`);
          res.json(response.data); // Enviar los datos al frontend
        } catch (error) {
          console.error('Error al obtener proveedores:', error.message);
          next(error); // Manejar errores
        }
      });    
        router.get('/discover/:movie/:id', async (req, res, next) => {
          const {media,id} = req.params
            try {          
              const response = await api(`/discover/${media}`,
                {                  
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
        router.get('/person/:id/tv_credits', async (req, res, next) => {
            try {
                const id = req.params
           //conectar id de cast con la ruta del back     
              const response = await api(`/person/${id}/tv_credits`, 
                {
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
          router.get('/discover/:media/:id', async (req, res, next) => {
            try {
                const {media,id} = req.params
           //conectar id de cast con la ruta del back     
              const response = await api(`/discover/${media}`, 
                {
                  params: { with_origin_country: id } 
                }
              );
              res.json(response.data); // Enviar los datos al frontend
            } catch (error) {
              console.error('Error al obtener proveedores:', error.message);
              next(error); // Manejar errores
            }
          });
          router.get('/discover/:media/:id}', async (req, res, next) => {
            try {
                const {media,id} = req.params
              const response = await api(`/discover/${media}`, {
                params: {
                  with_genres: id,
                }
              })
              res.json(response.data); // Enviar los datos al frontend
            } catch (error) {
              console.error('Error al obtener proveedores:', error.message);
              next(error); // Manejar errores
            }
          });
          router.get(`search/:media/:query`, async (req, res, next) => {
            try {
                const {media,query} = req.params
              const response = await api(`/search/${media}`, {
                params: {
                  query,
                }
              })
              res.json(response.data); // Enviar los datos al frontend
            } catch (error) {
              console.error('Error al obtener proveedores:', error.message);
              next(error); // Manejar errores
            }
          });          
          router.get('/:media/:id', async (req, res, next) => {
            try {
              const{media,id}=req.params
              const response = await api(`/${media}/${id}?append_to_response=videos,images`);
              res.json(response.data); // Enviar los datos al frontend
            } catch (error) {
              console.error('Error al obtener proveedores:', error.message);
              next(error); // Manejar errores
            }
          }); 
          router.get('/:media/:id/similar', async (req, res, next) => {
            try {
              const{media,id}=req.params
              const response = await api(`/${media}/${id}/similar?language=es-LA`);
              res.json(response.data); // Enviar los datos al frontend
            } catch (error) {
              console.error('Error al obtener proveedores:', error.message);
              next(error); // Manejar errores
            }
          });     
    router.get('/:type/:id', async (req, res, next) => {
        try {
          const{type,id}=req.params
          const response = await api(`/${type}/${id}?language=es-LA`);
          res.json(response.data); // Enviar los datos al frontend
        } catch (error) {
          console.error('Error al obtener proveedores:', error.message);
          next(error); // Manejar errores
        }
      });
    module.exports = router;
