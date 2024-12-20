const {Strategy}=require("passport-local")
const UserService = require("./../../../services/usersService")
const bcrypt = require("bcrypt")
const boom = require('@hapi/boom');

const service = new UserService()

const LocalStartegy= new Strategy(
    {usernameField:"nick",
        passwordField:"password"
    },
    async(nick,password,done)=>{
    try {
        console.log('Nick recibido:', nick);
       const user= await service.findUser(nick)
       console.log('Usuario devuelto por findUser:', user);

       if(!user){
        done(boom.unauthorized(),false)
       }
       const isMatch= await bcrypt.compare(password, user.password)
       if(!isMatch){
        done(boom.unauthorized(),false)
       }
        delete user.dataValues.password;
       done(null, user)
    } catch (error) {
        done(error, false)
    }
})

module.exports=LocalStartegy

// const { Strategy: LocalStrategy}=require("passport-local")
// const UserService = require("./../../../services/usersService")
// const bcrypt = require("bcrypt")
// const boom = require('@hapi/boom');
// const passport = require('passport');

// const service = new UserService()
// passport.use(
//     new LocalStrategy(
//         {usernameField:"nick",
//             passwordField:"password"
//         },
//         async(nick,password,done)=>{
//         try {
//            const user= await service.findUser(nick)
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

