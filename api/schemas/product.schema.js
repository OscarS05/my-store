// También este archivo podría ser llamado DTO
const Joi = require('joi');
const { Category } = require('../../db/models/category.model');

const id = Joi.number().integer();
const name = Joi.string().min(3).max(20);
const price = Joi.number().integer().min(10);
const description = Joi.string().min(10);
const image = Joi.string().uri();
const categoryId = Joi.number().integer();

const price_min = Joi.number().integer().min(0);
const price_max = Joi.number().integer();

const limit = Joi.number().integer();
const offset = Joi.number().integer();


const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  description: description.required(),
  image: image.required(),
  categoryId: categoryId.required()
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  description,
  image: image,
  categoryId
});

const getProductSchema = Joi.object({
  id: id.required(),
});

// FORMA REALIZADA EN LA CLASE
// const queryProductSchema = Joi.object({
//  limit,
//  offset,
//  price,
//  price_min,
//   price_max: price_max.when('price_min', {
//     is: price_min.required(),
//     then: Joi.required()
//   })
// });

const queryProductSchema = Joi.object({
  limit,
  offset,
  price,
  price_min,
  price_max: price_max.greater(Joi.ref('price_min')),
})
  .with('price_min', 'price_max')
  .with('price_max', 'price_min');


module.exports = { createProductSchema, updateProductSchema, getProductSchema, queryProductSchema };
