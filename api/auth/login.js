// const authenticate = util.promisify(passport.authenticate('local', { session: false }));
const cookie = require('cookie');
const jwt = require("jsonwebtoken")
const {config}=require("../../config/config")
const passport=require("passport")
require("../../utils/auth")

// Utilidad para envolver middlewares
function runMiddleware(req, res, fn) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

module.exports = async (req, res, next) => {  
    try {
      await runMiddleware(req, res, passport.authenticate('local', { session: false }));
      const user = req.user
      if (!user) {
        return res.status(401).json({ message: 'Credenciales incorrectas' });
      }
      console.log('Usuario autenticado:', user);
      // Crear el payload del token
      const payload = {
        sub: user.id,
        role: user.role
      };
      // Generar el token JWT
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1h' });
      //Configuración de la cookie con la biblioteca cookie: adaptación para entorno serveless
     // Serializar la cookie con la biblioteca cookie
     const serializedCookie = cookie.serialize('token', token, {
      httpOnly: true,
      secure: true, // Cambiar a true si usas HTTPS
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hora
      path: '/', // Cookie disponible en toda la aplicación
    });

    res.setHeader('Set-Cookie', serializedCookie);
    console.log("el token es:", serializedCookie)
      // Configurar la cookie con el token con res.cookies de express
      // res.cookie('token', token, {
      //   httpOnly: true, // Protege la cookie de ser accesible por JavaScript
      //   secure: true, // Cambiar a `true` en producción con HTTPS
      //   sameSite: 'Lax', // Protección CSRF
      //   maxAge: 60 * 60 * 1000 // 1 hora
      // });
      // console.log('Token generado:', token);

        // Llamar a `next` si es necesario
    if (next) {
      return next();
    }

      return res.json({
        message: 'Inicio de sesión exitoso',
        user: {
          id: user.id,
          nick: user.nick,
          role: user.role
        },
        token
      });
    } catch (err) {
      console.error('Error al generar el token:', err);
      if (next) {
        return next(err); // Pasar el error al middleware de manejo de errores
      }
      return res.status(500).json({ message: 'Error interno del servidor' });
    }  
};
// module.exports= async(req,res)=>{
//           try{
//             const user = await authenticate(req, res);
//             console.log('Resultado de user1:', user);
//             if (!user) {
//               return res.status(401).json({ message: 'Credenciales incorrectas' });
//             }
//             const payload={
//                 sub:user.id,
//                 role: user.role        
//             }
//             console.log('Resultado de user2:', user);
//             const token=jwt.sign(payload, config.jwtSecret,{ expiresIn: '1h' })
//               //Configurar la cookie con el token JWT
//               res.cookie('token', token, {
//                 httpOnly: true, // Protege la cookie de ser accesible por JavaScript
//                 secure: true,//process.env.NODE_ENV === 'production', // Solo en HTTPS en producción
//                 sameSite: 'Lax', // Protege contra ataques CSRF (Cross-Site Request Forgery)
//                 maxAge: 60 * 60 * 1000 // Duración de 1 hora
//               });
//               console.log("el token",req.cookies); // Verifica todas las cookies recibidas
//               console.log('Token JWT:', req.cookies.token); // Verifica específicamente la cookie del token
//             // Responder al cliente
//       return res.json({
//         message: 'Inicio de sesión exitoso',
//         user: {
//           id: user.id,
//           nick: user.nick,
//           role: user.role
//         },
//         token
//       });                    
//                 }
//                 catch(err){
//    // Manejo de errores
//    console.error('Error en el login:', err);
//    return res.status(500).json({
//      message: 'Error interno del servidor',
//      error: err.message
//    });
//                   }
//               }

          //       passport.authenticate('local', { session: false }, (err, user, info) => {
          //         if (err) {
          //    return next(err); // Pasa el error al manejador de errores
          //  }    
          //  if (!user) {
          //    return res.status(401).json({ message: 'Credenciales incorrectas' });
          //  }}

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
