const boom = require('@hapi/boom');
// Validar los datos
/*
* schema : es el esquema definido para los datos entrantes
* property : indica si esos datos provienen del cuerpo, query , o parametro
* de la petición 
*/
function validatorHandler(schema, property) {
  // callback de middleware
  return (req, res, next) => {
    // Capturar datos dinamicamente
    const data = req[property];
    // validador del esquema
    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
			// enviar mensaje de error de boom de peticion incorrecta 
      next(boom.badRequest(error));
    }
    // continuar si no hay error
    next();
  };
}

<<<<<<< HEAD
module.exports = validatorHandler;


=======
module.exports = validatorHandler;
>>>>>>> backend-node
