const passport=require("passport")

const LocalStartegy=require("./strategies/localStrategy")

passport.use(LocalStartegy)