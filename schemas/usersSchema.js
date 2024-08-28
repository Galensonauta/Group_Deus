const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const username = Joi.string()
const password = Joi.string().min(8);
// const role = Joi.string().min(5)

const createUserSchema = Joi.object({
  email: email.required(),
  username: username.required(),
  password: password.required(),  
  // role: role.required()
});

const updateUserSchema = Joi.object({
  email: email,
  username: username,
  // role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

module.exports = { createUserSchema, updateUserSchema, getUserSchema }