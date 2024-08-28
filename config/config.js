require("dotenv").config()

const config ={
    env: process.env.NODE_ENV||"dev",
    port: process.env.PORT||3001,
    dbUser: process.env.PG_USER,
    dbUserMysql: process.env.MY_USER,
    dbPassword: process.env.PG_PASS,
    dbPasswordMysql: process.env.MY_PASS,
    dbHost: process.env.PG_HOST,
    dbName: process.env.PG_NAME,
    dbPort: process.env.PG_PORT,    
  };
  
  module.exports = { config };