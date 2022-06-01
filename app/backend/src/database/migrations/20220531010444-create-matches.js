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
        type: Sequelize.NUMBER,
        references: {
          model: "Team",
          key: "teamname",
        },
      },
      hometeamgoals: {
        type: Sequelize.NUMBER
      },
      awayteam: {
        type: Sequelize.NUMBER,
        references: {
          model: "Team",
          key: "teamname",
        },
      },
      awayteamgoals: {
        type: Sequelize.NUMBER
      },
      inprogress: {
        type: Sequelize.BOOLEAN
      },
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('matches');
  }
};