const { Model, DataTypes, Sequelize } = require('sequelize');
const { CUSTOMER_TABLE } = require('./customer.model');
const { defaultValueSchemable } = require('sequelize/lib/utils');

const ORDER_TABLE = 'orders';

const OrderSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  state: {
    allowNull: false,
    type: DataTypes.STRING,
    defaultValue: 'status'
  },
  totalAmount: {
    allowNull: false,
    field: 'total_amount',
    type: DataTypes.FLOAT,
    defaultValue: '0'
  },
  customerId: {
    field: 'customer_id',
    allowNull: false,
    type: DataTypes.INTEGER,
    references: {
      model: CUSTOMER_TABLE,
      key: 'id',
    }
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE,
    field: 'create_at',
    defaultValue: Sequelize.NOW
  },
}

class Order extends Model {
  static associate(models) {
    this.belongsTo(models.Customer, {
      as: 'customer',
    });
  }

  static config(sequelize) {
    return {
      sequelize,
      tableName: ORDER_TABLE,
      modelName: 'Order',
      timestamps: false
    }
  }
}


module.exports = { ORDER_TABLE, OrderSchema, Order };
