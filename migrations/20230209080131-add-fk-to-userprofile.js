'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
   up (queryInterface, Sequelize) {
    return queryInterface.addColumn('UserProfiles', 'UserId', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references : {
        model : 'Users'
      }
    });
  },

   down (queryInterface, Sequelize) {
    return queryInterface.removeColumn('UserProfiles', 'UserId')
  }
};
