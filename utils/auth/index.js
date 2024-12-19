const passport=require("passport")

const LocalStartegy=require("./strategies/localStrategy")
const JwtStrategy=require("./strategies/jwtStrategy")

passport.use(LocalStartegy)
passport.use(JwtStrategy)


// const LocalStrategy=require("passport-local").Strategy
// const { Strategy, ExtractJwt } = require('passport-jwt');
// const {User}=require("../../db/model/userModel")
// const UserService = require("../../services/usersService")
// const bcrypt = require("bcrypt")
// const boom = require('@hapi/boom');
// const passport = require('passport');
// const {config}=require("../../config/config")

// const service = new UserService()
// passport.use(
//     new LocalStrategy(
//         {
//             usernameField:"nick",
//             passwordField:"password"
//         },
//         async(nick,password,done)=>{
//         try {
//            const user= await service.findUser(nick)
//            console.log('Estrategia Local:', { nick, password, user });
//            if(!user){
//             done(boom.unauthorized(),false)
//            }
//            const isMatch= await bcrypt.compare(password, user.password)
//            if(!isMatch){
//             done(boom.unauthorized(),false)
//            }
//             delete user.dataValues.password;
//            done(null, user)
//         } catch (error) {
//             done(error, false)
//         }
//     })
// )
//  const options={
//                 jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
//                 secretOrKey: config.jwtSecret
//             }

// passport.use(
//     new Strategy(options,async (jwt_payload,done)=>{
//         try {       
//             const user = await User.findByPk(jwt_payload.sub); // Verificar si el usuario existe en la base de datos
//             if (user) {
//                 console.log("lo encontro",user.id)
//               return done(null, user); // Usuario encontrado
//             } else {
//                 console.log("no lo encontro pero ers valido el t",user)
    
//               return done(null, false); // Usuario no encontrado, token inválido
//             }
//           } catch (error) {
//             return done(error, false); // Error en la búsqueda del usuario
//           }
//     })    
// )