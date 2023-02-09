'use strict';
const {
  Model
} = require('sequelize');
const bcrypt = require ('bcryptjs')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne (models.UserProfile)
      User.belongsToMany(models.Medicine, {
        through: models.Transaction
      })
    }
  }
  User.init({
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'User',
  });
  User.beforeCreate((user, options) => {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(user.password, salt);
    user.password = hash
  })
  return User;
};