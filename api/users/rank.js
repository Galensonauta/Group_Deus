// const UserService = require('../../services/usersService');
// const service = new UserService();

// module.exports= async (req,res,next)=>{
//       try{
//         const{type}=req.params
//         const rank= await service.getTopRatedMovies(type)
//         res.status(200).json(rank);
//       }catch(error){
//         next(error)
//         return res.status(500).json({ message: 'Error interno del servidor' });
//       }
//     }
    
    // router.get("/rank/:type",