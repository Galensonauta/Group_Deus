const Joi = require('joi');

const name = Joi.string();
const id = Joi.number().integer();
const favId = Joi.number().integer();
const userId = Joi.number().integer();
const movieId = Joi.number().integer();
const rank= Joi.number().min(0).max(10);
const rank_min=Joi.number().integer();
const rank_max=Joi.number().integer();
const commit=Joi.string();
const tag=Joi.string();

const createFavoritoSchema = Joi.object({
  name: name.required(),
  userId:userId.required(),
});
const getFavoritoSchema = Joi.object({
  id: id.required(),
});
const queryFavoritosSchema=Joi.object({
  rank,
  rank_min,
  rank_max: rank_max.greater(Joi.ref('rank_min'))
  })

const addMovieSchema = Joi.object({
  favId: favId.required(),
  movieId: movieId.required(),
  rank: rank,
  commit: commit,
  tag: tag
});

const deleteMovieSchema = Joi.object({
  favId: favId.required(),
  movieId: movieId.required(),
})

const updateFavoritoSchema=Joi.object({  
  // favId: favId.required(),
  // movieId: movieId.required(),
  rank: rank,
  commit: commit,
  tag: tag  
})


module.exports = { createFavoritoSchema, addMovieSchema, getFavoritoSchema, updateFavoritoSchema,deleteMovieSchema,queryFavoritosSchema}