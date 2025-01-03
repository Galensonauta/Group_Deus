const express = require('express');
const jwt = require("jsonwebtoken")
const {config}=require("../config/config")
const passport=require("passport")
const router = express.Router();
const UserService = require('./../services/usersService');
const service = new UserService();


// const Cookies =require('universal-cookie');
// const cookies = new Cookies();


router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const payload = {
        sub: user.id,
        role: user.role,
      };

      // Generar el token JWT
      const token = jwt.sign(payload, config.jwtSecret, { expiresIn: '1d' });
      console.log('Token JWT (crudo):', token);

      // Configurar la cookie con `res.cookie`
      res.cookie('token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production', // Cambiar a `false` para pruebas locales
        sameSite: 'none', // Cambiar según el flujo deseado
        path: '/',
        maxAge: 24 * 60 * 60 * 1000, // Duración de 1 día
      });

      console.log('Cookies generadas en login:', req.cookies.token);
      console.log('Token generadas en login:', token);


      res.json({
        message: 'Inicio de sesión exitoso',
        user,
        token,
      });
    } catch (error) {
      next(error);
    }
  }
);

router.get('/validate-token',
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
    res.status(200).json({ message: 'Token válido'});      
    }  
  catch(err){
    console.error('Error al validar el token:', err.message || err);
    next(err); // Pasar el error al middleware de manejo de errores
  }
});
router.post('/logout', (req, res) => { 
  res.clearCookie('token', {
    httpOnly: true,     // Mantiene la cookie protegida de accesos de JavaScript
    secure: true,
    sameSite:"none"     // Configura la política de SameSite
  });
  // Responder con un mensaje de éxito
  console.log('Cookie de token eliminada');
  res.json({ message: 'Cierre de sesión exitoso' });
});

module.exports=router