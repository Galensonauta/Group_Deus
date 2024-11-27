const {Sequelize}=require ("sequelize")
const { config } = require('../config/config');
const setupModels=require ("../db/model")

const options = {
    dialect: 'postgres',
    logging: config.isProd ? false : true,
  }
// let URI=""
// if(config.isProd){
//   URI=config.dbUrlProd
// }else{
//     URI=config.dbUrl
// }
  const sequelize = new Sequelize(config.dbUrl,options);
setupModels(sequelize)
module.exports=sequelize
// const sequelize = new Sequelize(
//   process.env.NILEDB_NAME, // Nombre de la base de datos
//   process.env.NILEDB_USER, // Usuario
//   process.env.NILEDB_PASSWORD, // Contraseña
//   {
//     host: process.env.NILEDB_HOST || '127.0.0.1', // Usa IPv4 explícitamente
//     port: process.env.PORT || 5432,
//     dialect: 'postgres',
//     logging: false, // Desactiva los logs para depuración (opcional)
//   }
// );
// sequelize.sync({ force: true });