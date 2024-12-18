const cookie = require('cookie');

module.exports = (req,res)=>{ 
    const serializedCookie = cookie.serialize('token', '', {
        httpOnly: false, // Igual que al configurarla (ajustar según tu configuración original)
        secure: true, // Cambiar a true si usas HTTPS
        sameSite: 'lax', // Igual que al configurarla
        maxAge: 0, // Configura el tiempo de vida en 0 para eliminarla
        path: '/', // Mismo path que la cookie original
      });    
      // Establecer el encabezado para sobrescribir la cookie
      res.setHeader('Set-Cookie', serializedCookie);
            // Responder con un mensaje de éxito
    res.json({ message: 'Cierre de sesión exitoso' });
}