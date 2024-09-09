const express = require('express');
const FavoritosService = require('../services/favoritoService');
const validationHandler = require('../middlewares/validatorHandler');

const {
  createFavoritoSchema, 
  addMovieSchema, 
  getFavoritoSchema,
  updateFavoritoSchema,
  deleteMovieSchema,
  queryFavoritosSchema
} = require('../schemas/favoritosSchema');

const router = express.Router();
const service = new FavoritosService();

router.get('/',
  validationHandler(queryFavoritosSchema, "query"),  
  async (req, res, next) => {
  try {
    res.json(await service.find(req.query));
  } catch (error) {
    next(error);
  }
});

router.get('/:id',
  validationHandler(getFavoritoSchema, "params"),    
  async (req, res, next) => {
  try {
    const {id}=req.params
    res.json(await service.findOne(id));
  } catch (error) {
    next(error);
  }
});

router.post('/',
  validationHandler(createFavoritoSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.create(body));
    } catch (error) {
      next(error);
    }
  }
);
router.post('/add-movie',
  validationHandler(addMovieSchema, 'body'),
  async (req, res, next) => {
    try {
      const body = req.body;
      res.status(201).json(await service.addMovie(body));
    } catch (error) {
      next(error);
    }
  }
);
router.patch('/:id/:movieId',   
  validationHandler(updateFavoritoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id, movieId } = req.params;
      const body = req.body;
      const favorito = await service.updateFavorito(id,movieId,body);
      res.json(favorito);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/',
  validationHandler(deleteMovieSchema, 'body'),
  async (req, res, next) => {
    try {     
      const body = req.body;
      res.status(201).json(await service.deleteMovie(body));
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/:id',
  validationHandler(getFavoritoSchema, 'params'),
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

module.exports = router;