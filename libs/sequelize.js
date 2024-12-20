const {Sequelize}=require ("sequelize")
const { config } = require('../config/config');
const setupModels=require ("../db/model")
require("dotenv").config();

// const options = {
//     dialect: 'postgres',
//     dialectModule: require('pg'), // Especifica el cliente de PostgreSQL
//     logging: console.log,
//     pool: {
//       max: 5, // Máximo de conexiones
//       min: 0,  // Mínimo de conexiones
//       acquire: 30000, // Tiempo máximo para intentar conexión
//       idle: 10000, // Tiempo antes de liberar una conexión inactiva
//     },
//   }
//   if (config.isProd) {
//     options.dialectOptions  = {
//       ssl: {
//         require: true, // Habilitar SSL
//         rejectUnauthorized: false
//       }
//     }
//   }
  let sequelize;
  if (!sequelize) {  
  // sequelize = new Sequelize(process.env.DATABASE_URL||config.dbUrl, options)
   sequelize = new Sequelize(config.dbUrl||config.dbUrlDev, {
    dialect: 'postgres',
    dialectModule: require('pg'), // Especifica el cliente de PostgreSQL
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false, // Asegúrate de permitir conexiones inseguras para Neon
      },
      pool: {
        max: 5, // Número máximo de conexiones simultáneas
        min: 0, // Número mínimo de conexiones
        acquire: 30000, // Tiempo máximo para intentar conectar antes de dar error
        idle: 10000, // Tiempo antes de liberar una conexión inactiva

      },
      logging: console.log, // Opcional: habilita logs para depuración
    },
  });
  
  ;}
  setupModels(sequelize)
  console.log('Sequelize inicializado. Probando conexión...');

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa con la base de datos'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));
  
module.exports=sequelize
