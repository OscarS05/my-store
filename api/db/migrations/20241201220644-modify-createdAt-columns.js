'use strict';
// In this migration, the names of the columns that had create_at and the name of the property
// in the schema createdAt were modified to change the name to created_at.
const { USER_TABLE } = require('./../models/user.model');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.renameColumn(USER_TABLE, 'create_at', 'created_at');
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.renameColumn('users', 'created_at', 'create_at');
  }
};
