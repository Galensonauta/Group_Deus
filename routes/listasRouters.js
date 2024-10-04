const express = require('express');
const ListasService = require('../services/listaService');
const validatorHandler = require('../middlewares/validatorHandler');
const passport=require("passport")
const { checkRoles } = require('../middlewares/authHandler');
const {
  createListaSchema, 
  addMovieSchema, 
  getListaSchema,
  updateListaSchema,
  deleteMovieSchema,
  queryListasSchema
} = require('../schemas/listasSchema');


const router = express.Router();
const service = new ListasService();

router.get('/',
  validatorHandler(queryListasSchema, "query"),  
  async (req, res, next) => {
  try {
    res.json(await service.find(req.query));
  } catch (error) {
    next(error);
  }
});

router.get('/:listId/:type',
  validatorHandler(getListaSchema, "params"),    
  async (req, res, next) => {
  try {
    const {listId,type}=req.params
    res.json(await service.findOne(listId,type));
  } catch (error) {
    next(error);
  }
});

router.post('/',
  passport.authenticate("jwt", {session:false}),
  checkRoles("admin"),
  validatorHandler(createListaSchema, 'body'),
  async (req, res, next) => {
    try {            
      const body = req.body;
      res.status(201).json(await service.createLista(body));
    } catch (error) {
      next(error);
    }
  }
);

router.post('/:listId/:type/:id',
  passport.authenticate("jwt", {session:false}),
  checkRoles("admin","citizen"),
  validatorHandler(addMovieSchema, 'params'),
  async (req, res, next) => {
    try {
      const {listId,type,id}=req.params
      res.status(201).json(await service.addMovieToList(listId,type,id));
    } catch (error) {
      next(error);
    }
  }
);

router.patch('/:id',
  passport.authenticate("jwt", {session:false}),
  checkRoles("admin"),
  validatorHandler(getListaSchema, 'params'),
  validatorHandler(updateListaSchema, 'body'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      const body = req.body;
      const lista = await service.updateLista(id,body);
      res.json(lista);
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:listId/:type/:id',
  passport.authenticate("jwt", {session:false}),
  checkRoles("admin","citizen"),
  validatorHandler(deleteMovieSchema, 'params'),
  async (req, res, next) => {
    try {     
      const {listId,type,id} = req.params;
      res.status(201).json(await service.deleteMovie(listId,type,id));
    } catch (error) {
      next(error);
    }
  }
);
router.delete('/:id',
  passport.authenticate("jwt", {session:false}),
  checkRoles("admin"),
  validatorHandler(getListaSchema, 'params'),
  async (req, res, next) => {
    try {
      const { id } = req.params;
      await service.deleteLista(id);
      res.status(201).json({id});
    } catch (error) {
      next(error);
    }
  }
);


module.exports = router;