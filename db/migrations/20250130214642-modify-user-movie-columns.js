'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('user_movie', 'rank', {
      type: Sequelize.DECIMAL(4,1),
      allowNull: true
    });
    await queryInterface.changeColumn('user_movie', 'comment', {
      type: Sequelize.STRING(5000),
      allowNull: true
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('user_movie', 'rank', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
    await queryInterface.changeColumn('user_movie', 'comment', {
      type: Sequelize.STRING,
      allowNull: true
    });
  }
};
