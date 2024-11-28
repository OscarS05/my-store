const boom = require('@hapi/boom');
const { models } = require('../../libs/sequelize');

class OrderService {
  constructor(){
  }

  async create(data) {
    const newOrder = models.Order.create(data, {
      include: ['customer'],
    });
    return newOrder;
  }

  async find() {
    return ( await models.Order.findAll({
      include: ['customer'],
    }) );
  }

  async findOne(id) {
    return ( await models.Order.findByPk(id, {
      include:{
        association: 'customer',
        include: ['user'],
      },
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

module.exports = OrderService;
