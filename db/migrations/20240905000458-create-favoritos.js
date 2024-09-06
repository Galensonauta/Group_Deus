'use strict';

const {FavoritosSchema, FAVORITOS_TABLE}= require ("../model/favoritoModel")
module.exports = {
  up :async (queryInterface)=> {
 await  queryInterface.createTable(FAVORITOS_TABLE, FavoritosSchema)
  },
  down:async (queryInterface)=> {
  await queryInterface.dropTable(FAVORITOS_TABLE)
  }
};