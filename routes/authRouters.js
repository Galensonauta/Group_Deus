const express = require('express');
const jwt = require("jsonwebtoken")
const {config}=require("../config/config")
const passport=require("passport")
const router = express.Router();
const UserService = require('./../services/usersService');
const service = new UserService();
const Cookies =require('universal-cookie');
const cookies = new Cookies();


router.post('/login',  (req, res, next) => {
  console.log('Cuerpo de la solicitud:', req.body);
  next();
},
    passport.authenticate("local",{session:false}),
    async (req, res, next) => {
  try {
    const user=req.user
    const payload={
        sub:user.id,
        role: user.role        
    }
    const token=jwt.sign(payload, config.jwtSecret,{expiresIn: '1d' })
    console.log('Encabezado Set-Cookie:', cookies.get(token));
      //Configurar la cookie con el token JWT
      cookies.set('token', token, {
        httpOnly: true,        // Protege la cookie de ser accesible por JavaScript
       secure: true,
        sameSite: 'none',    // Protege contra ataques CSRF (Cross-Site Request Forgery)
        path: '/', // Hacer que la cookie sea accesible en todas las rutas
      // maxAge: 24 * 60 * 60 * 1000 // Duración de 1 día para la cookie
      });      
      console.log('Token JWT(crudo):', token);
      console.log('Encabezado Set-Cookie:', cookies.get(token)); 
      console.log('Cookies generadas en login:', req.cookies);
      
      res.json({ message: 'Inicio de sesión exitoso' ,
        user,token
          });
  } catch (error) {
    next(error);
  }
});
router.get('/validate-token', 
  (req, res, next) => {
  console.log('Cookies recibidas en validate:', req.cookies);
  next();
},
  passport.authenticate('jwt', { session: false }),
   async (req, res,next) => {
    console.log('el usuario es:', req.user); // Verificar si req.user está presente
    try{
    const userId = req.user.id; // Esto asume que el middleware de passport agrega el usuario al request
    const user = await service.find(userId);
    console.log('Encabezado Set-Cookie:', res.getHeader('Set-Cookie'));
    if (!user) {
      return res.status(401).json({ message: 'Token inválido: usuario no encontrado' });
    }
    console.log("el usuario es:",req.user.dataValues.nick)
  res.status(200).json({ message: 'Token válido'});  }
  catch(err){
    console.error('Error al validar el token:', err.message || err);
    next(err); // Pasar el error al middleware de manejo de errores
  }
});
router.post('/logout', (req, res) => {
  // Configurar la cookie para que expire de inmediato
  Cookies.remove('token');
  console.log('Sesión cerrada');
 res.json({ message: 'Cierre de sesión exitoso' });

  // res.clearCookie('token', {
  //   httpOnly: false,     // Mantiene la cookie protegida de accesos de JavaScript
  //   secure: true,
  //   sameSite:"none"     // Configura la política de SameSite
  // });
  // // Responder con un mensaje de éxito
  // console.log('Cookie de token eliminada');
  // res.json({ message: 'Cierre de sesión exitoso' });
});

module.exports=router