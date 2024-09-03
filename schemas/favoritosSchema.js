const Joi = require('joi');


const userId = Joi.number().integer();
const movieId = Joi.number().integer();
// const listMovie = Joi.array().items(movieId);


const createFavoritoSchema = Joi.object({
  userId:userId.required(),
  movieId: movieId.required(),
});

const updateFavoritoSchema = Joi.object({
  movieId,
});

const getFavoritoSchema = Joi.object({
  id: userId.required(),
});

module.exports = { createFavoritoSchema, updateFavoritoSchema, getFavoritoSchema }