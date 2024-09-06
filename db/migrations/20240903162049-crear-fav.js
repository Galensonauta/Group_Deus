'use strict';

const {FavoritoSchema, FAVORITO_TABLE}= require ("../model/favoritoModel")
module.exports = {
  up :async (queryInterface)=> {
 await  queryInterface.createTable(FAVORITO_TABLE, FavoritoSchema)
  },
  down:async (queryInterface)=> {
  await queryInterface.dropTable(FAVORITO_TABLE)
  }
};
