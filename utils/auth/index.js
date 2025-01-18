const passport=require("passport")
const LocalStartegy=require("./strategies/localStrategy")

passport.use("local",LocalStartegy)

const Strategy = require('passport-jwt').Strategy;
const {User}=require("../../db/model/userModel")
const {config}=require("../../config/config")
const cookieExtractor = (req) => {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies.token; // Asume que la cookie se llama 'token'
  }
  return token;
};
const options = {
  jwtFromRequest: cookieExtractor, // Extraer token del encabezado Authorization
  secretOrKey: config.jwtSecret,
};

const jwtStrategy = new Strategy(options, async (payload, done) => {
  try {
    const user = await User.findByPk(payload.sub); // Buscar usuario por ID (payload.sub)
    if (!user) {
      return done(null, false); // Usuario no encontrado
    }
    return done(null, user); // Usuario autenticado correctamente
  } catch (err) {
    return done(err, false); // Error al autenticar
  }
});

passport.use(jwtStrategy);
 