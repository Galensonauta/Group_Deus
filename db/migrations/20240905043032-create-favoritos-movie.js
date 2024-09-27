'use strict';

const { LISTAS_MOVIE_TABLE, ListaMovieSchema } = require('./../model/listaMovieModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(LISTAS_MOVIE_TABLE, ListaMovieSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("listas_movies");
  }
};
