"use strict";
const { Model } = require("sequelize");
const bcrypt = require("bcryptjs") 
const db = require("../models");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // define association here
      User.hasOne(models.Member, {
        foreignKey: "userId",
        as: "member"
      })
    }
  }
  User.init(
    {
      name: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      role: {
        type: DataTypes.ENUM("admin", "user"),
        defaultValue: "user",
        validate: {
          isIn: {
            args: [["admin", "teacher", "user"]],
            msg: "Role must be one of: admin, teacher, user",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "User",
      hooks: {
        beforeCreate: async (user) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  );
  return User;
};
