const passport=require("passport")
const LocalStartegy=require("./strategies/localStrategy")
// const JwtStrategy=require("./strategies/jwtStrategy")

passport.use("local",LocalStartegy)
// passport.use("jwt",JwtStrategy)

const Strategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
// const {User}=require("../../db/model/userModel")
const userService = require ("../../services/usersService")
const {config}=require("../../config/config")
const service = new userService
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token; // Leer el token desde la cookie
  }
  return token;
};
const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken([cookieExtractor]), // Extraer token del encabezado Authorization
  secretOrKey: config.jwtSecret,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await service.find(payload.sub); // Buscar usuario por ID (payload.sub)
    if (!user) {
      return done(null, false); // Usuario no encontrado
    }
    return done(null, user); // Usuario autenticado correctamente
  } catch (err) {
    return done(err, false); // Error al autenticar
  }
});

passport.use(jwtStrategy);
 