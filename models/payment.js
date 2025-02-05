'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Payment extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Payment.belongsTo(models.Fine, {
        foreignKey: 'fineId',
        as: 'fine'
      })
    }
  }
  Payment.init({
    amount: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    type: {
      type: DataTypes.ENUM('cash', 'card', 'other'),
      defaultValue: 'cash'
    },
    fineId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Fines',
        key: 'id'
      },
      onDelete: 'CASCADE',
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Payment',
  });
  return Payment;
};