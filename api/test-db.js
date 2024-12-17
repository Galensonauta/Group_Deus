// const sequelize = require("../libs/sequelize"); // Asegúrate de que apunta al archivo correcto

// module.exports = async (req, res) => {
//   try {
//     console.log('Iniciando conexión con la base de datos...');
//     const [results] = await sequelize.query('SELECT NOW()');
//     console.log('Resultados de la consulta:', results);

//     res.status(200).json({ success: true, dbTime: results[0] });
//   } catch (error) {
//     console.error('Error al procesar la solicitud:', error);
//     res.status(500).json({ success: false, error: error.message });
//   }
// };
const { Sequelize } = require('sequelize');

// Reemplaza con tu URL de conexión
const sequelize = new Sequelize("postgres://neondb_owner:vuNOFgijCH50@ep-quiet-lake-a4w2ydt0-pooler.us-east-1.aws.neon.tech/neondb?sslmode=require", {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

async function testConnection() {
  try {
    await sequelize.authenticate();
    console.log('Conexión exitosa');
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error);
  } finally {
    await sequelize.close();
  }
}

testConnection();


