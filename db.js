const { Sequelize } = require('sequelize');

let sequelize;

if (!sequelize) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    dialectModule: require('pg'), // Usa el cliente pg explícitamente
    logging: console.log, // Opcional: habilita logs para depuración
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false, // Neon requiere SSL
      },
    },
  });
}

module.exports = sequelize;
