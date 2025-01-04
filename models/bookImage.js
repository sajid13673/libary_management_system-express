'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookImage extends Model {
    static associate(models) {
      BookImage.belongsTo(models.Book, {
        foreignKey: 'bookId',
        onDelete: 'CASCADE'
      });
      BookImage.belongsTo(models.Image, {
        foreignKey: 'imageId',
        onDelete: 'CASCADE'
      });
    }
  }
  BookImage.init({
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Books',
        key: 'id',
        onDelete: 'CASCADE'
      },
      allowNull: false
    },
    imageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Images',
        key: 'id',
        onDelete: 'CASCADE'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BookImage',
  });
  return BookImage;
};
