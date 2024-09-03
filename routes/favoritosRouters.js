const express = require('express');
const FavoritosService = require('../services/favoritoService');
const validationHandler = require('../middlewares/validatorHandler');

const {
  createFavoritoSchema, 
  updateFavoritoSchema, 
  getFavoritoSchema
} = require('../schemas/favoritosSchema');

const router = express.Router();
const service = new FavoritosService();

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

router.patch('/:id',
  validationHandler(getFavoritoSchema, 'params'),
  validationHandler(updateFavoritoSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      res.status(201).json(await service.update(id, body));
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