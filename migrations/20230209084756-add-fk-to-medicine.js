'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn('Medicines', 'CategoryId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references : {
        model : 'Categories'
      }
    });
  },

   down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('Medicines', 'CategoryId')
  }
};
