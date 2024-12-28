'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class BookImage extends Model {
    static associate(models) {
      // Define associations here
    }
  }
  BookImage.init({
    bookId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Books',
        key: 'id'
      },
      allowNull: false
    },
    imageId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Images',
        key: 'id'
      },
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'BookImage',
  });
  return BookImage;
};
