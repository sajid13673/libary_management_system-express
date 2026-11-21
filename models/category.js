"use strict";
const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.belongsToMany(models.Book, {
        through: "BookCategory",
        foreignKey: "categoryId",
        otherKey: "bookId",
        as: "books",
      });
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "Category",
    },
  );
  return Category;
};
