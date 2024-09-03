'use strict';

const {MovieSchema, MOVIE_TABLE}= require ("../model/movieModel")
module.exports = {
  up :async (queryInterface)=> {
 await  queryInterface.createTable(MOVIE_TABLE, MovieSchema)
  },
  down:async (queryInterface)=> {
  await queryInterface.dropTable(MovieSchema)
  }
};
