'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Book extends Model {
    static associate(models) {
      Book.belongsToMany(models.Image,{
        through: 'BookImage',
        foreignKey: 'bookId',
        otherKey: 'imageId',
        as: 'images',
        onDelete: 'CASCADE'
      });
      Book.hasMany(models.Borrowing, {
        foreignKey: 'bookId',
        as: 'borrowings'
      });
    }
  }
  Book.init(
    {
      title: DataTypes.STRING,
      author: DataTypes.STRING,
      publisher: DataTypes.STRING,
      year: DataTypes.INTEGER,
      status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      sequelize,
      modelName: "Book",
      hooks: {
        beforeDestroy: async (book) => {
          const loadedBook = await book.reload({ 
            include: { model: sequelize.models.Image, as: 'images' } 
          }); 
          const images = loadedBook.images; 
          if (images) { 
            await Promise.all(images.map(async (image) => { 
              await image.destroy(); 
            }));
          }
        }
      },
    }
  );
  return Book;
};