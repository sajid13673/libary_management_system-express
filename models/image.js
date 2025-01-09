'use strict';
const { Model } = require('sequelize');
const path = require('path');
const { deleteFile } = require('../utils/manageFiles');
const fs = require('fs').promises;

module.exports = (sequelize, DataTypes) => {
  class Image extends Model {
    static associate(models) {
      Image.belongsToMany(models.Book, { 
        through: 'BookImage', 
        foreignKey: 'imageId', 
        otherKey: 'bookId', 
        as: 'books' }); 
      Image.belongsTo(models.Member, {
        foreignKey: 'memberId', 
        as: 'member'
      })
    }
  }
  Image.init({
    url: {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Image',
    hooks:{
      beforeDestroy: async function (image) {
        console.log("image being destroyed");
        const url = image.url;
        await deleteFile(url);
      }
    }
  });
  return Image;
};
