const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string()
const overview = Joi.string()
const limit=Joi.number().integer();
const offset=Joi.number().integer();

const createMovieSchema = Joi.object({
  title: title.required(),  
  overview: overview  
});

const updateMovieSchema = Joi.object({
    title: title,  
    overview: overview
});

const getMovieSchema = Joi.object({
  id: id.required(),
});
const queryParamsMovieSchema=Joi.object({
  limit,
  offset
})

module.exports = { createMovieSchema, updateMovieSchema, getMovieSchema ,queryParamsMovieSchema}