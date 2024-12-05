const {Sequelize}=require ("sequelize")
const { config } = require('../config/config');
const setupModels=require ("../db/model")
require("dotenv").config();


const options = {
    dialect: 'postgres',
    dialectModule: require('pg'), // Especifica el cliente de PostgreSQL
    logging: console.log,
  }
  if (config.isProd) {
    options.dialectOptions  = {
      ssl: {
        rejectUnauthorized: false
      }
    }
  }

  const sequelize = new Sequelize(process.env.DATABASE_URL||config.dbUrl, options);

  setupModels(sequelize)
  console.log('Sequelize inicializado. Probando conexión...');

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa con la base de datos'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));
  
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