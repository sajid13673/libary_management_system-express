'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Borrowing extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Borrowing.belongsTo(models.Book, {
        foreignKey: 'bookId',
        as: 'book'
      });
      Borrowing.belongsTo(models.Member, {
        foreignKey: 'memberId',
        as: 'member'
      })
    }
  }
  Borrowing.init({
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Books',
        key: 'id'
      }
    },
    memberId:  {
      type: DataTypes.INTEGER,
      references: {
        model: 'Members',
        key: 'id'
      }
    },
    dueDate: DataTypes.DATEONLY,
    returnDate: DataTypes.DATEONLY,
    status: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Borrowing',
  });
  return Borrowing;
};