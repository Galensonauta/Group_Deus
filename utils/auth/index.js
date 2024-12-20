const passport=require("passport")
const LocalStartegy=require("./strategies/localStrategy")
// const JwtStrategy=require("./strategies/jwtStrategy")

passport.use("local",LocalStartegy)
// passport.use("jwt",JwtStrategy)

const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const {User}=require("../../db/model/userModel")
const {config}=require("../../config/config")

 const options={
                jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
                secretOrKey: config.jwtSecret
            }
passport.use(
    new JwtStrategy(options,async (jwt_payload,done)=>{
        try {       
            const user = await User.findByPk(jwt_payload.sub); // Verificar si el usuario existe en la base de datos
            if (user) {
                console.log("lo encontro",user)
              return done(null, user); // Usuario encontrado
            } else {
                console.log("no lo encontro pero ers valido el t",user)
    
              return done(null, false); // Usuario no encontrado, token inválido
            }
          } catch (error) {
            return done(error, false); // Error en la búsqueda del usuario
          }
    })    
)

// const LocalStrategy=require("passport-local").Strategy
// const UserService = require("../../services/usersService")
// const bcrypt = require("bcrypt")
// const boom = require('@hapi/boom');
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