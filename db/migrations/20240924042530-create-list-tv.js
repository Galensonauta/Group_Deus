'use strict';

const { LISTAS_TV_TABLE, ListaTvSchema } = require('../model/listaTvModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(LISTAS_TV_TABLE, ListaTvSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("listas_tvs");
  }
};
