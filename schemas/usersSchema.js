const Joi = require('joi');

const id = Joi.number().integer();
const nick=Joi.string().max(16)
const email = Joi.string().email();
const password = Joi.string().min(5);
const role = Joi.string().min(5)

const createUserSchema = Joi.object({
  nick: nick.required(),
  email: email.required(),
  password: password.required(),  
  role: role.required()
});

const updateUserSchema = Joi.object({
  nick: nick.required(),
  email: email,
  password: password.required(),  
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }