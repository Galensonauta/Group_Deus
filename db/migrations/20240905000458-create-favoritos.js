'use strict';

const {ListasSchema, LISTAS_TABLE}= require ("../model/listaModel")
module.exports = {
  up :async (queryInterface)=> {
 await  queryInterface.createTable(LISTAS_TABLE, ListasSchema)
  },
  down:async (queryInterface)=> {
  await queryInterface.dropTable("listas")
  }
};