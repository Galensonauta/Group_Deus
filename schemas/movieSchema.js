const Joi = require('joi');
const id=Joi.number().integer();
const movieId = Joi.number().integer();
const type = Joi.string()

const comment = Joi.string()
const rank = Joi.number().precision(1).min(0).max(10);  

const tag = Joi.string()

const limit=Joi.number().integer();
const offset=Joi.number().integer();
const createMovieSchema = Joi.object({
  id: id.required(),  
});
const getMovieSchema = Joi.object({
  id: id.required(),
});
const queryParamsMovieSchema=Joi.object({
  limit,
  offset
})
const verificarInteraction =Joi.object({
  movieId: movieId.required(),
  type:type.required(),
})
const addInteraction=Joi.object({
  comment,
  rank,
  tag
})

module.exports = { createMovieSchema, getMovieSchema ,queryParamsMovieSchema,addInteraction,verificarInteraction}