const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.DATABASE_URL, {
  dialect: 'postgres',
  logging: true,
  dialectOptions: {
    ssl: {
      rejectUnauthorized: false,
    },
  },
});

module.exports = async (req, res) => {
  if (req.method === 'GET') {
    try {
      const [results] = await sequelize.query('SELECT NOW()');
      res.status(200).json({ success: true, dbTime: results[0] });
    } catch (error) {
      console.error('Error al probar la conexión:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  } else {
    res.status(405).json({ message: 'Método no permitido' });
  }
};
