'use strict';

const {TvSchema, TV_TABLE}= require ("../model/tvModel")
module.exports = {
  up :async (queryInterface)=> {
 await  queryInterface.createTable(TV_TABLE, TvSchema)
  },
  down:async (queryInterface)=> {
  await queryInterface.dropTable(TV_TABLE)
  }
};
