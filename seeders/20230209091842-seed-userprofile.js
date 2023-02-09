'use strict';
const fs = require ('fs')
/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    const userprofile = JSON.parse(fs.readFileSync('./data/userprofile.json', 'utf-8'))
    .map (el => {
      el.createdAt = el.updatedAt  = new Date ()
      return el
    })
    return queryInterface.bulkInsert('UserProfiles', userprofile, {});
  },

   down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('UserProfiles', null, {});
  }
};
