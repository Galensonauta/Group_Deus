'use strict';

const { USER_TV_TABLE, UserTvSchema } = require('../model/userTvModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_TV_TABLE, UserTvSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("user_tv");
  }
};
