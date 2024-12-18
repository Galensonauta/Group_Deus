const cookie = require('cookie');
const jwt = require("jsonwebtoken")
const {config}=require("../../config/config")
const passport=require("passport")
const { runMiddleware } = require('../../utils/middlewares');

require("../../utils/auth")

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
      httpOnly: false,
      secure: true, // Cambiar a true si usas HTTPS
      sameSite: 'lax',
      maxAge: 60 * 60, // 1 hora
      path: '/', // Cookie disponible en toda la aplicación
    });
    res.setHeader('Set-Cookie', serializedCookie);
    console.log("el token es:", serializedCookie)
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
