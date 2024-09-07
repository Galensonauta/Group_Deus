const Joi = require('joi');

const name = Joi.string();
const id = Joi.number().integer();
const favId = Joi.number().integer();
const userId = Joi.number().integer();
const movieId = Joi.number().integer();
const rank= Joi.number().min(0).max(10)

const createFavoritoSchema = Joi.object({
  name: name.required(),
  userId:userId.required(),
});
const getFavoritoSchema = Joi.object({
  id: id.required(),
});
const addMovieSchema = Joi.object({
  favId: favId.required(),
  movieId: movieId.required(),
  rank: rank
});
const destroyMovieSchema = Joi.object({
  favId: favId.required(),
  movieId: movieId.required()
});
const updateFavoritoSchema=Joi.object({
  name: name,
  rank: rank  
})


module.exports = { createFavoritoSchema, addMovieSchema, getFavoritoSchema, updateFavoritoSchema, destroyMovieSchema}