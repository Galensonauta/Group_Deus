const express = require('express');
// const jwt = require("jsonwebtoken")
// const {config}=require("../config/config")

const passport=require("passport")
const MoviesService = require('../services/movieService.js');
const validatorHandler = require('./../middlewares/validatorHandler');
const { 
  getMovieSchema,
  queryParamsMovieSchema,
  addInteractionMovie,
  verificarInteraction
 } = require("./../schemas/movieSchema");
const { checkRoles } = require('../middlewares/authHandler.js');

// Instanciar servicio de peliculas
const router = express.Router();
const service = new MoviesService();
router.get('/',
  validatorHandler(queryParamsMovieSchema, 'query'),
   async (req, res,next) => {
  try{    
  const movies = await service.find(req.query);
  // Respuesta al cliente
  res.json(movies);
  }catch(err){
    next(err)
  }
});
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
router.patch("/:userId/:type/:id",
  passport.authenticate("jwt", {session:false}),
  checkRoles("admin","citizen"),
  validatorHandler(verificarInteraction, 'params'),
  validatorHandler(addInteractionMovie, 'body'),
  async (req, res, next) => {
    try {
      const { userId,type, id}=req.params
      const body=req.body
      const newMovie = await service.addInteraction(userId,type, id,body);
      res.status(201).json(newMovie);
    } catch (error) {
      next(error);
    }
  }
);



module.exports= router;