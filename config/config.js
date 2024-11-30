
require("dotenv").config()

const config ={
  env: process.env.NODE_ENV||"development",
  isProd: process.env.NODE_ENV === 'production',
  port: process.env.PORT||3001,
  dbUrl:process.env.DATABASE_URL,
  dbUrlDev: process.env.DEVDB_URL,
  apiKey: process.env.API_KEY
}
module.exports = { config };
// dbUser: process.env.PG_USER,
//   dbHost: process.env.PG_HOST,
//   dbName: process.env.PG_NAME,
//   dbPassword: process.env.PG_PASS,
//   dbPort: process.env.PG_PORT,   
//   dbUserMysql: process.env.MY_USER,
//   apiKeyProd: process.env.API,
//   jwtSecret: process.env.JWT_SECRET,
//   dbPasswordMysql: process.env.MY_PASS,  
//   dbUrl: process.env.DEVDB_URL, 
//  dbUrlProd: process.env.NILEDB_URL




  // module.exports = { 
  //   development:{
  //     env: process.env.NODE_ENV||"development",
  //     port: process.env.PORT||3001,
  //     dbUser: process.env.PG_USER,
  //     dbHost: process.env.PG_HOST,
  //     dbName: process.env.PG_NAME,
  //     dbPassword: process.env.PG_PASS,
  //     dbPort: process.env.PG_PORT,   
  //     apiKeyProd: process.env.API,
  //     jwtSecret: process.env.JWT_SECRET,
  //     dbUrl: process.env.DEVDB_URL 
  //   },
  //   production:{
  //     dbUser: process.env.NILEDB_USER,
  //     dbHost: process.env.NILE_DB_HOST,
  //     dbName: process.env.NILEDB_NAME,
  //     dbPassword: process.env.NILEDB_PASSWORD,
  //     apiKeyProd: process.env.API,
  //     jwtSecret: process.env.JWT_SECRET,
  //     dbUrl: process.env.NILEDB_URL
  //   }
  // };