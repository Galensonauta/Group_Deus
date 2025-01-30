'use strict';

// const { USER_TV_TABLE, UserTvSchema } = require('../model/userTvModel');
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.changeColumn("user_tv","rank", {
      type: Sequelize.DECIMAL(4,1),
      allowNull: true
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.changeColumn("user_tv", 'rank', {
      type: Sequelize.INTEGER,
      allowNull: true
    });
  }
};

