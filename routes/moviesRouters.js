const express = require('express'); // Requerir libreria express
const router = express.Router();
const MoviesService = require('../services/movieService');
const validatorHandler = require('./../middlewares/validatorHandler');
const { 
  createMovieSchema, 
  updateMovieSchema, 
  getMovieSchema } = require("./../schemas/movieSchema")

// Instanciar servicio de peliculas
const service = new MoviesService();

router.post('/',
  validatorHandler(createMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      const newMovie = await service.create(body);
      res.status(201).json(newMovie);
    } catch (error) {
      next(error);
    }
  }
);
// Recuperar todas las pelis
router.get('/', async (req, res,next) => {
  try{    
  const movies = await service.find();
  // Respuesta al cliente
  res.json(movies);
  }catch(err){
    next(err)
  }
});

// Recuperar un producto en especifico
router.get('/:id', 
  validatorHandler(getMovieSchema, 'params'),
  async (req, res,next) => {
  try{    
  const { id } = req.params;
  const movies  = await service.findOne(id)
  res.json(movies);
  }catch(err){
    next(err)
  }
})
router.patch('/:id',
  validatorHandler(getMovieSchema, 'params'),
  validatorHandler(updateMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const movie = await service.update(id, body);
      res.json(movie);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
  validatorHandler(getMovieSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.delete(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);


module.exports= router;