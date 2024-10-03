// const {config} = require('./../config/config')

require("dotenv").config()

const config ={
    env: process.env.NODE_ENV||"development",
    port: process.env.PORT||3001,
    dbUser: process.env.PG_USER,
    dbHost: process.env.PG_HOST,
    dbName: process.env.PG_NAME,
    dbPassword: process.env.PG_PASS,
    dbPort: process.env.PG_PORT,   
    dbUserMysql: process.env.MY_USER,
    apiKeyProd: process.env.API,
    dbPasswordMysql: process.env.MY_PASS,    
  };
  
  module.exports = { config };