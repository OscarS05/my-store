const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class OrderService {
  constructor(){
  }

  async addItem(data){
    const newItem = await models.OrderProduct.create(data);
    return newItem;
  }

  async create(userId) {
    const customer = await models.Customer.findOne({
      where: { user_id: userId },
      attributes: ['id'],
    });
    if (!customer) {
      throw new Error('Customer not found');
    }
    const newOrder = await models.Order.create({
      customerId: customer.id
    });
    return newOrder;
  }

  async find() {
    return ( await models.Order.findAll({
      include: ['customer'],
    }) );
  }

  async findOne(id) {
    const order = await models.Order.findByPk(id, {
      include:[
        {
          association: 'customer',
          include: ['user'],
        },
        'items'
      ]
    });
    return order;
  }

  async findByUser(userId) {
    const orders = await models.Order.findAll({
      where: {
        '$customer.user.id$': userId
      },
      include: [
        {
          association: 'customer',
          include: ['user'],
        }
      ],
    });
    return orders;
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
