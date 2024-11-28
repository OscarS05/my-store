const { User, UserSchema } = require('./user.model');
const { Product, ProductSchema } = require('./product.model');
const { Customer, CustomerSchema } = require('./customer.model');
// Sequelize is the conection to DB
function setupModels(sequelize) {
  User.init(UserSchema, User.config(sequelize));
  Product.init(ProductSchema, Product.config(sequelize));
  Customer.init(CustomerSchema, Customer.config(sequelize));

  Customer.associate(sequelize.models);
  User.associate(sequelize.models);
}

module.exports = setupModels;
