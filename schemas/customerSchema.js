const Joi = require('joi');

const id = Joi.number().integer();
const name = Joi.string()
const lastName = Joi.string().min(3);
const phone = Joi.string();
const userId = Joi.number().integer();

const createCustomerSchema = Joi.object({
  name: name.required(),
  lastName: lastName.required(),  
  phone: phone,
  userId: userId.required()
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