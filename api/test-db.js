const { Sequelize } = require('sequelize');

let sequelize;
if (!sequelize) {
  sequelize = new Sequelize(process.env.DATABASE_URL, {
    dialect: 'postgres',
    logging: console.log,
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
      },
    },
  });
}

module.exports = async (req, res) => {
  try {
    console.log('Recibida solicitud en /api/test-db');

    const [results] = await sequelize.query('SELECT NOW()');
    console.log('Resultados de la consulta:', results);

    res.status(200).json({ success: true, dbTime: results[0] });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);

    // Responde con el error para verlo en los logs
    res.status(500).json({ success: false, error: error.message });
  }
};

