'use strict';

const { FAVORITO_MOVIE_TABLE, FavoritoMovieSchema } = require('./../model/favoritosMovieModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(FAVORITO_MOVIE_TABLE, FavoritoMovieSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable(FAVORITO_MOVIE_TABLE);
  }
};
