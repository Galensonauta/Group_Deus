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
    console.log(`Validando ${property}:`, req[property]); // Log de los datos a validar

    const { error } = schema.validate(data, { abortEarly: false });
    if (error) {
			// enviar mensaje de error de boom de peticion incorrecta 
      console.error('Errores de validación:', error.details.map(err => err.message));
      next(boom.badRequest(error.details.map(detail => detail.message).join(', ')));
    }else{
    // continuar si no hay error
    next();}
  };
}
module.exports = validatorHandler;



