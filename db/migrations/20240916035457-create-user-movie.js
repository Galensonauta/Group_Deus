'use strict';

const { USER_MOVIE_TABLE, UserMovieSchema } = require('./../model/userMovieModel');

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.createTable(USER_MOVIE_TABLE, UserMovieSchema);
  },
  down: async (queryInterface) => {
    await queryInterface.dropTable("user_movie");
  }
};