const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class CategoryService {

  constructor(){
  }
  async create(data) {
    return ( await models.Category.create(data) );
  }

  async find() {
    return ( await models.Category.findAll() );
  }

  async findOne(id) {
    return ( await models.Category.findByPk(id, {
      include: ['product'],
    }) );
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }

}

module.exports = CategoryService;
