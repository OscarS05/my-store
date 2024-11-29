const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');


class CustomerService {
  constructor() {}

  async find() {
    return (await models.Customer.findAll({
      include: ['user'],
    }));
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if(!customer){
      throw boom.notFound('Customer not found');
    }
    return customer;
  }

  async create(data){
    const newCustomer = await models.Customer.create(data, {
      include: ['user'],
    });
    return newCustomer;
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    return ( await customer.update(changes));
  }

  async delete(id) {
    const customer = await this.findOne(id);
    await customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
