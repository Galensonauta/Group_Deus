const Joi = require('joi');

const id = Joi.number().integer();
const type = Joi.string()
const movieId = Joi.number().integer();
const nick=Joi.string().max(10)
const email = Joi.string().email();
const password = Joi.string().min(3)
const role = Joi.string()

const createUserSchema = Joi.object({
  nick: nick.required(),
  password: password.required(),
  role:role  
});
const updateUserSchema = Joi.object({
  nick: nick,
  email: email,
  password: password,
  role:role  
});
const getUserSchema = Joi.object({
  id: id.required(),
});
const getUserInteractionSchema=Joi.object({
  id,
  type,
movieId
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema,getUserInteractionSchema }