require("dotenv").config();
const { Sequelize } = require("sequelize");

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false, // Requerido para Neon
    },
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Conexión exitosa con Neon");
    return sequelize.query('SELECT version()'); // Consulta básica
  })
  .then(([results]) => {
    console.log("Versión de PostgreSQL:", results[0]);
    sequelize.close();
  })
  .catch((err) => {
    console.error("Error al conectar con Neon:", err);
  });
