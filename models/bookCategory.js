'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookCategory extends Model {
    static associate(models) {
      BookCategory.belongsTo(models.Book, {
        foreignKey: 'bookId',
        onDelete: 'CASCADE'
      });
      BookCategory.belongsTo(models.Category, {
        foreignKey: 'categoryId',
        onDelete: 'CASCADE'
      });
    }
  }

  BookCategory.init({
    bookId: {
      type: DataTypes.INTEGER,
      primaryKey: true, // Prevents duplicate pairs & removes need for a separate 'id' column
      allowNull: false,
      references: {
        model: 'Books',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    categoryId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      references: {
        model: 'Categories',
        key: 'id'
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'BookCategory',
  });

  return BookCategory;
};
