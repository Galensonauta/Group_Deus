const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const name = Joi.string()
const lastName = Joi.string().min(3);
const phone = Joi.string();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  user:Joi.object({
    email : email.required(),
    password : password.required()
  }),
  name: name.required(),
  lastName: lastName.required(),  
  phone: phone,
});

const updateCustomerSchema = Joi.object({
  name: name,
  lastName: lastName,
  userId:userId
});

const getCustomerSchema = Joi.object({
  id: id.required(),
});

module.exports = { createCustomerSchema, updateCustomerSchema, getCustomerSchema }