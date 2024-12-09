const login = require("../routes/authRouters")

module.exports=login

// router.post('/login', 
//     passport.authenticate("local", {session:false}),
//     async (req, res, next) => {
//   try {
//     const user=req.user
//     const payload={
//         sub:user.id,
//         role: user.role        
//     }
//     const token=jwt.sign(payload, config.jwtSecret)
//       //Configurar la cookie con el token JWT
//       res.cookie('token', token, {
//         httpOnly: true,        // Protege la cookie de ser accesible por JavaScript
//        secure: true,
//         sameSite: 'Lax',    // Protege contra ataques CSRF (Cross-Site Request Forgery)
//       //  maxAge: 24 * 60 * 60 * 1000 // Duración de 1 día para la cookie
//       });
//       console.log("el token",req.cookies); // Verifica todas las cookies recibidas
//       console.log('Token JWT:', req.cookies.token); // Verifica específicamente la cookie del token
  
//     res.json({ message: 'Inicio de sesión exitoso' ,
//         user,token
//           });
//   } catch (error) {
//     next(error);
//   }
// });