const express = require('express');
const passport=require("passport")
const MoviesService = require('../services/movieService.js');
const validatorHandler = require('./../middlewares/validatorHandler');
const { 
  getMovieSchema,
  queryParamsMovieSchema,
  addInteraction,
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
router.get("/rank",
  async (req,res,next)=>{
    try{
      // const{type}=req.params
      const rank= await service.getTopRatedMovies(req.query)
      res.status(201).json(rank)
    }catch(error){
      next(error)
    }
  }
  )
router.patch("/my-interaction-new/:type/:movieId",
  passport.authenticate("jwt", {session:false}),
  validatorHandler(verificarInteraction, 'params'),
  validatorHandler(addInteraction, 'body'),
  async (req, res, next) => {
    try {
      const { type, movieId}=req.params
      const userId = req.user.id
      const body=req.body
      const newMovie = await service.addInteraction(userId,type, movieId,body);
      res.status(201).json(newMovie);
    } catch (error) {
      next(error);
    }
  }
);

module.exports= router;