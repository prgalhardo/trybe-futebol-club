'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      hometeam: {
        type: Sequelize.STRING
      },
      hometeamgoals: {
        type: Sequelize.STRING
      },
      awayteam: {
        type: Sequelize.STRING
      },
      awayteamgoals: {
        type: Sequelize.STRING
      },
      inprogress: {
        type: Sequelize.STRING
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};