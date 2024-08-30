'use strict';

const {userSchema, USER_TABLE}= require ("../model/userModel")
module.exports = {
  up :async (queryInterface)=> {
 await  queryInterface.createTable(USER_TABLE, userSchema)
  },
  down:async (queryInterface)=> {
  await queryInterface.dropTable(USER_TABLE)
  }
};
