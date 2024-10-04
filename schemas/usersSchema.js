const Joi = require('joi');

const id = Joi.number().integer();
const type = Joi.string()
const movie = Joi.number().integer();
const nick=Joi.string().max(16)
const email = Joi.string().email();
const password = Joi.string()
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
movie
})

module.exports = { createUserSchema, updateUserSchema, getUserSchema,getUserInteractionSchema }