// const JwtEstrat = require('passport-jwt').Strategy;

// // const ExtractJwt = require('passport-jwt').ExtractJwt;
// const{User}=require("./../../../db/model/userModel")
// const {config}=require("../../../config/config")

// const cookieExtractor = (req) => {
//   let token = null;
//   if (req && req.cookies) {
//     token = req.cookies.token; // Asume que la cookie se llama 'token'
//   }
//   return token;
// };
// const options={
//     jwtFromRequest: cookieExtractor,
//     secretOrKey: config.jwtSecret
// }
// const JwtStrategy= new JwtEstrat(options,async (jwt_payload,done)=>{
//     try {   
//         const user = await User.findByPk(jwt_payload.sub); // Verificar si el usuario existe en la base de datos
//         if (user) {
//             console.log("lo encontro",user.id)
//             console.log('Token recibido en el servidor:', jwt_payload);  
//             // Verifica que el token se reciba correctamente
//           return done(null, user); // Usuario encontrado
//         } else {
//             console.log("no lo encontro pero ers valido el t",user)
//           return done(null, false); // Usuario no encontrado, token inválido
//         }
//       } catch (error) {
//         return done(error, false); // Error en la búsqueda del usuario
//       }
// })

// module.exports=JwtStrategy

// const { Strategy, ExtractJwt } = require('passport-jwt');
// // const UserService = require('./../../../services/usersService');
// // const service = new UserService();
// const{User}=require("./../../../db/model/userModel")
// const {config}=require("../../../config/config")

// const options={
//     jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//     secretOrKey: config.jwtSecret
// }
// const JwtStrategy= new Strategy(options,async (jwt_payload,done)=>{
//     try {   

//         const user = await User.findByPk(jwt_payload.sub); // Verificar si el usuario existe en la base de datos
//         if (user) {
//             console.log("lo encontro",user.id)
//           return done(null, user); // Usuario encontrado
//         } else {
//             console.log("no lo encontro pero ers valido el t",user)

//           return done(null, false); // Usuario no encontrado, token inválido
//         }
//       } catch (error) {
//         return done(error, false); // Error en la búsqueda del usuario
//       }
//     // console.log('Token recibido en el servidor:', payload);  // Verifica que el token se reciba correctamente
//     // return done(null, payload)
// })

// module.exports=JwtStrategy


