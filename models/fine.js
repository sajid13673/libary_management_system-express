'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Fine extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Fine.belongsTo(models.Borrowing, {
        foreignKey: 'borrowingId',
        as: 'borrowing'
      });
      Fine.belongsTo(models.Member, {
        foreignKey:'memberId',
        as:'member'
      });
      Fine.hasOne(models.Payment, {
        foreignKey: 'fineId',
        as: 'payment'
      });
    }
  }
  Fine.init({
    amount: DataTypes.STRING,
    days: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN,
    borrowingId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Borrowings',
        key: 'id'
      },
    },
    memberId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Members',
        key: 'id'
      },
      onDelete: 'CASCADE' 
    }
  }, {
    sequelize,
    modelName: 'Fine',
  });
  return Fine;
};