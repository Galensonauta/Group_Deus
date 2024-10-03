const passport=require("passport")

const LocalStartegy=require("./strategies/localStrategy")
const JwtStrategy=require("./strategies/jwtStrategy")

passport.use(LocalStartegy)
passport.use(JwtStrategy)