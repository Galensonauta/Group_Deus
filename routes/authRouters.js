const express = require('express');
const jwt = require("jsonwebtoken")
const {config}=require("../config/config")

const passport=require("passport")
const router = express.Router();
const UserService = require('./../services/usersService');

const service = new UserService();

router.post('/login', 
    passport.authenticate("local", {session:false}),
    async (req, res, next) => {
  try {
    const user=req.user
    const payload={
        sub:user.id,
        role: user.role        
    }
    const token=jwt.sign(payload, config.jwtSecret)
      //Configurar la cookie con el token JWT
      res.cookie('token', token, {
        httpOnly: true,        // Protege la cookie de ser accesible por JavaScript
       secure: true,
        sameSite: 'lax',    // Protege contra ataques CSRF (Cross-Site Request Forgery)
        path: '/', // Hacer que la cookie sea accesible en todas las rutas
      maxAge: 24 * 60 * 60 * 1000 // Duración de 1 día para la cookie
      });
      
      console.log('Token JWT(crudo):', token); 
  
    res.json({ message: 'Inicio de sesión exitoso' ,
        user,token
          });
  } catch (error) {
    next(error);
  }
});
router.get('/validate-token', 
  passport.authenticate('jwt', { session: false }),
   async (req, res) => {
    console.log('Cookies en esta solicitud:', req.cookies); // Deberías ver la cookie aquí

    const userId = req.user.id; // Esto asume que el middleware de passport agrega el usuario al request
    const user = await service.find(userId);
    if (!user) {
      return res.status(401).json({ message: 'Token inválido: usuario no encontrado' });
    }
    console.log("el usuario es:",req.user.dataValues.nick)
  res.status(200).json({ message: 'Token válido'});  
});
router.post('/logout', (req, res) => {
  // Configurar la cookie para que expire de inmediato
  res.clearCookie('token', {
    httpOnly: true,     // Mantiene la cookie protegida de accesos de JavaScript
    secure: true,      // Asegúrate de configurarlo a 'true' si estás en producción con HTTPS
    sameSite:'lax'     // Configura la política de SameSite
  });
  // Responder con un mensaje de éxito
  res.json({ message: 'Cierre de sesión exitoso' });
});

module.exports=router