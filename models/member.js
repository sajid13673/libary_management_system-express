'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Member extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Member.belongsTo(models.User,{
        foreignKey: "userId",
        as: "user"
      });
      Member.hasMany(models.Borrowing, {
        foreignKey: "memberId",
        as: "borrowings"
      });
      Member.hasOne(models.Image, {
        foreignKey: 'memberId',
        as: 'image'
      });
      Member.hasMany(models.Fine, {
        foreignKey: 'memberId',
        as: 'fine',
      })
    }
  }
  Member.init({
    name: DataTypes.STRING,
    address: DataTypes.STRING,
    phoneNumber: DataTypes.STRING,
    userId: {
      type:  DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id',
      },
      onDelete: 'CASCADE'
    }
  }, {
    sequelize,
    modelName: 'Member',
    hooks: {
      beforeDestroy: async (member) => {
        const user = await member.getUser();
        await user.destroy();
      }
    }
  });
  return Member;
};