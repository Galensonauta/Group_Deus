const UserService = require('../../services/usersService');
const service = new UserService();
const { runMiddleware } = require('../../utils/middlewares');
const passport=require("passport")
require("../../utils/auth")

module.exports=async(req,res)=>{
  try{
    await runMiddleware(req, res, passport.authenticate('jwt', { session: false }));
    const user = req.user.dataValues.id
  const userValidate=await service.find(user)
  console.log('Resultado del id user:', user);
  console.log('Resultado de req user :', req.user);
          if (!userValidate) {
            return res.status(401).json({ message: 'Token inválido: usuario no encontrado' });
          }
          console.log("el usuario es:",userValidate)
        return res.json({ message: 'Token válido',user: userValidate});         
    }
        catch(error){
            console.error("Error en la función Serverless:", error);
            res.status(500).json({ message: "Error interno del servidor", error: error.message });
        }           
  }
  // passport.authenticate("jwt",{session:false}, async (err,user, info)=>{
  //     try{
  //     if (err) {
  //         console.error("Error en la autenticación:", err);
  //     return res.status(500).json({ message: "Error interno en la autenticación" });
  //       }    
  //       if (!user) {
  //         return res.status(401).json({ message: 'Credenciales incorrectas' });
  //       }

// router.get('/validate-token', 
//     passport.authenticate('jwt', { session: false }),
//      async (req, res) => {
//       const userId = req.user.id; // Esto asume que el middleware de passport agrega el usuario al request
//       const user = await service.find(userId);
//       if (!user) {
//         return res.status(401).json({ message: 'Token inválido: usuario no encontrado' });
//       }
//       console.log("el usuario es:",req.user.dataValues.nick)
//     res.status(200).json({ message: 'Token válido'});  
//   });