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
    name: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "name is required"
        },
        notEmpty : {
          msg : "name is required"
        }
      }
    },
    description: {
      type : DataTypes.STRING,
      allowNull : false,
      validate : {
        notNull : {
          msg : "description is required"
        },
        notEmpty : {
          msg : "description is required"
        }
      }
    },
    medicineLevel: DataTypes.STRING,
    manufactureCode: DataTypes.STRING,
    stock: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "stock is required"
        },
        notEmpty : {
          msg : "stock is required"
        },
        minimumStock(stock) {
          if ((stock < 20 ) && ((this.medicineLevel) === 'High' || (this.medicineLevel) === 'Medium')) {
            throw new Error('Minimum stock for medicine level high or medium is 20')
          }
        }
      }
    },
    price: {
      type : DataTypes.INTEGER,
      allowNull : false,
      validate : {
        notNull : {
          msg : "price is required"
        },
        notEmpty : {
          msg : "price is required"
        }
      }
    },
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