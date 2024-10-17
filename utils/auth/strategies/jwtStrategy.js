const JwtEstrat = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const UserService = require('./../../../services/usersService');
// const service = new UserService();
const{User}=require("./../../../db/model/userModel")
const {config}=require("../../../config/config")

const options={
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: config.jwtSecret
}
const JwtStrategy= new JwtEstrat(options,async (jwt_payload,done)=>{
    try {
        console.log(jwt_payload.sub)
        console.log(jwt_payload)

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
    // console.log('Token recibido en el servidor:', payload);  // Verifica que el token se reciba correctamente
    // return done(null, payload)
})

module.exports=JwtStrategy