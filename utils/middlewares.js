// // utils/middlewareUtils.js

// /**
//  * Utilidad para envolver middlewares en promesas
//  * @param {Object} req - Objeto de solicitud HTTP
//  * @param {Object} res - Objeto de respuesta HTTP
//  * @param {Function} fn - Middleware a ejecutar
//  * @returns {Promise} Promesa que resuelve o rechaza según el resultado del middleware
//  */
// function runMiddleware(req, res, fn) {
//     return new Promise((resolve, reject) => {
//       fn(req, res, (result) => {
//         if (result instanceof Error) {
//           return reject(result); // Rechazar la promesa si el middleware lanza un error
//         }
//         return resolve(result); // Resolver la promesa si el middleware se ejecuta correctamente
//       });
//     });
//   }
  
//   module.exports = {
//     runMiddleware,
//   };