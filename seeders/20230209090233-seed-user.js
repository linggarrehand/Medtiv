'use strict';
const fs = require ('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    const user = JSON.parse(fs.readFileSync('./data/user.json', 'utf-8'))
    .map (el => {
      el.createdAt = el.updatedAt  = new Date ()
      return el
    })
    return queryInterface.bulkInsert('Users', user, {});
  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
