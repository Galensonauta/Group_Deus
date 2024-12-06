const sequelize = require("../libs/sequelize"); // Asegúrate de que apunta al archivo correcto

module.exports = async (req, res) => {
  try {
    console.log('Iniciando conexión con la base de datos...');
    const [results] = await sequelize.query('SELECT NOW()');
    console.log('Resultados de la consulta:', results);

    res.status(200).json({ success: true, dbTime: results[0] });
  } catch (error) {
    console.error('Error al procesar la solicitud:', error);
    res.status(500).json({ success: false, error: error.message });
  }
};


