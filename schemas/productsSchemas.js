/* eslint-disable no-undef */
// eslint-disable-next-line no-undef
const Joi = require('joi');

const id = Joi.string().uuid();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const isBlock= Joi.boolean()


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image,
  isBlock
});

const updateProductSchema = Joi.object({
  name,
  price,
  image,
  isBlock

});

const getProductSchema = Joi.object({
  id: id.required(),
});

module.exports = { createProductSchema, updateProductSchema, getProductSchema };