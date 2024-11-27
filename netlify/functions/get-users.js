// const userService = require('./../services/usersService');

// exports.handler = async (event, context) => {
//   try {
//     // Llama al servicio para obtener los usuarios
//     const users = await userService.find();

//     return {
//       statusCode: 200,
//       body: JSON.stringify(users),
//     };
//   } catch (error) {
//     console.error('Error al obtener usuarios:', error);

//     return {
//       statusCode: 500,
//       body: JSON.stringify({ error: 'Error al obtener usuarios' }),
//     };
//   }
// };