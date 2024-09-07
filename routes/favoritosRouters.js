const express = require('express');
const FavoritosService = require('../services/favoritoService');
const validationHandler = require('../middlewares/validatorHandler');

const {
  createFavoritoSchema, 
  addMovieSchema, 
  getFavoritoSchema,
  updateFavoritoSchema,
  destroyMovieSchema
} = require('../schemas/favoritosSchema');

const router = express.Router();
const service = new FavoritosService();

router.get('/',
  async (req, res, next) => {
  try {
    res.json(await service.find());
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



router.patch('/:id',
  validationHandler(getFavoritoSchema, 'params'),
  validationHandler(updateFavoritoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const favorito = await service.update(id, body);
      res.json(favorito);
    } catch (error) {
      next(error);
    }
  }
);

router.delete('/movie-id',  
  validationHandler(destroyMovieSchema,"body"),
  async (req, res, next) => {
    try {
      const body = req.body
      res.status(201).json(await service.destroyMovie(body));
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