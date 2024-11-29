'use strict';

const { CustomersSchema, CUSTOMER_TABLE } = require('./../models/customer.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable(CUSTOMER_TABLE, CustomersSchema);
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.dropTable(CUSTOMER_TABLE);
  }
};
