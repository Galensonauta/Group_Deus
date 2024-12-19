const UserService = require('../../services/usersService');
const service = new UserService();
const { runMiddleware } = require('../../utils/middlewares');
const passport=require("passport")
require("../../utils/auth")

module.exports= async (req, res, next) => {
    try {
    await runMiddleware(req,res, passport.authenticate("jwt", {session:false}))    
      const { type } = req.params;
      const userId = req.user.id
      const interactionUser= await service.findUserList(userId,type);
      if (next) {
        return next();
      }
      res.json(interactionUser);
    } catch (error) {
        if (next) {
            return next(error); // Pasar el error al middleware de manejo de errores
          }
          return res.status(500).json({ message: 'Error interno del servidor' });
    }
  }
