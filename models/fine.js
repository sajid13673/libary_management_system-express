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
      // define association here
    }
  }
  Fine.init({
    amount: DataTypes.STRING,
    days: DataTypes.INTEGER,
    isPaid: DataTypes.BOOLEAN,
    borrowingId: DataTypes.INTEGER,
    memberId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Fine',
  });
  return Fine;
};