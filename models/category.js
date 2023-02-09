'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Category extends Model {
    static associate(models) {
      Category.hasMany(models.Medicine)
    }
  }
  Category.init({
    name: DataTypes.STRING,
    MedicineId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Category',
  });
  return Category;
};