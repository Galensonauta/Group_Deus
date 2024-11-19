const Joi = require('joi');

const name = Joi.string();
const id = Joi.number().integer();
const userId = Joi.number().integer();
const listId = Joi.number().integer();
const type= Joi.string()
const rank= Joi.number().min(0).max(10);
const rank_min=Joi.number().integer();
const rank_max=Joi.number().integer();

const createListaSchema = Joi.object({
  name: name,
  userId: userId.required()  
});
const getListaSchema = Joi.object({
  listId: listId.required(),
  type
});
const queryListasSchema=Joi.object({
  rank,
  rank_min,
  rank_max: rank_max.greater(Joi.ref('rank_min'))
  })
const addMovieSchema = Joi.object({
  id: id.required(),
  type 
});
const deleteMovieSchema = Joi.object({
  id: id.required(),
  type
})
const updateListaSchema=Joi.object({  
  name: name,
})

module.exports = { createListaSchema, addMovieSchema, getListaSchema, updateListaSchema,deleteMovieSchema,queryListasSchema}