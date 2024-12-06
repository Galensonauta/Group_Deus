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
  let sequelize;
  if (!sequelize) {  
  sequelize = new Sequelize(process.env.DATABASE_URL||config.dbUrl, options);}
  setupModels(sequelize)
  console.log('Sequelize inicializado. Probando conexión...');

sequelize.authenticate()
  .then(() => console.log('Conexión exitosa con la base de datos'))
  .catch(err => console.error('Error al conectar con la base de datos:', err));
  
module.exports=sequelize
