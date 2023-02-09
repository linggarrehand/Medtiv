'use strict';
const fs = require ('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    const medicine = JSON.parse(fs.readFileSync('./data/medicine.json', 'utf-8'))
    .map (el => {
      el.createdAt = el.updatedAt  = new Date ()
      return el
    })
    return queryInterface.bulkInsert('Medicines', medicine, {});
  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Medicines', null, {});
  }
};
