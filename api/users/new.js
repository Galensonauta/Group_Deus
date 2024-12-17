const UserService = require('../../services/usersService');
const service = new UserService();
const { createUserSchema } = require('../../schemas/usersSchema');

module.exports= async (req,res)=>{
  try {
          const {error,value}=createUserSchema.validate(req.body, { abortEarly: false })
          if (error) {
            console.error('Error de validación:', error.details.map(err => err.message).join(', '));
            return res.status(400).json({ 
              message: 'Error de validación',
              details: error.details.map(err => err.message) 
            });
          }
      const newUser = await service.create(value);
      res.status(201).json(newUser);      
    } catch (error) {
        console.error('Error al procesar la solicitud:', error);
      res.status(500).json({ success: false, error: error.message })
    }
}
// router.post('/new',
//     // validatorHandler(createUserSchema, 'body'),
//     async (req, res) => {
//         console.log('Cuerpo de la solicitud:', req.body); // Asegúrate de que el nick y password lleguen correctamente
//       try {
//         const body = req.body;
//         const newUser = await service.create(body);
//         res.status(201).json(newUser);      
//       } catch (error) {
//         console.error('Error al procesar la solicitud:', error);
//       res.status(500).json({ success: false, error: error.message })
//       }
//     }
//   );
//   module.exports= router;