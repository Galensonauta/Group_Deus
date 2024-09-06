const Joi = require('joi');

const id = Joi.number().integer();
const title = Joi.string()
const originalTitle = Joi.string()
const overview = Joi.string()
const genreIds = Joi.number().integer();
const popularity = Joi.number().integer();
const releaseDate = Joi.string()

const createMovieSchema = Joi.object({
  title: title.required(),  
  originalTitle: originalTitle.required(),
  overview: overview,
  genreIds: genreIds,
  popularity: popularity,
  releaseDate: releaseDate
});

const updateMovieSchema = Joi.object({
    title: title,  
    originalTitle: originalTitle,
    overview: overview,
    genreIds: genreIds,
    popularity: popularity,
    releaseDate: releaseDate
});

const getMovieSchema = Joi.object({
  id: id.required(),
});

module.exports = { createMovieSchema, updateMovieSchema, getMovieSchema }