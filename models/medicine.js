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
    price: DataTypes.INTEGER,
    CategoryId : DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Medicine',
  });
  Medicine.beforeCreate((medicine, options) => {
    if (medicine.medicineLevel === "High") return medicine.manufactureCode = `1170-${new Date().getTime()}`
    if (medicine.medicineLevel === "Medium") return medicine.manufactureCode = `5431-${new Date().getTime()}`
    if (medicine.medicineLevel === "Low") return medicine.manufactureCode = `9984-${new Date().getTime()}`
  })
  return Medicine;
};