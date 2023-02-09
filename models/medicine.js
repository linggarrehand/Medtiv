'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Medicine extends Model {
    static associate(models) {
      Medicine.belongsTo (models.Category)
      Medicine.belongsToMany(models.User, {
        through: models.Transaction
      })
    }
  }
  Medicine.init({
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    medicineLevel: DataTypes.STRING,
    manufactureCode: DataTypes.STRING,
    stock: DataTypes.INTEGER,
    price: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  return Medicine;
};