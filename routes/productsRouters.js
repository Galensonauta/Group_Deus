const express = require('express'); // Requerir libreria express
const router = express.Router();
const ProductsService = require("./../services/productsService")
const validatorHandler =require("./../middlewares/validatorHandler")
const { createProductSchema, updateProductSchema, getProductSchema}= require("./../schemas/productsSchemas")

// Instanciar servicio productos
const service = new ProductsService();

// Recuperar todos los productos
router.get('/', async (req, res) => {
  try {
    const products = await service.find();
    // Respuesta al cliente
    res.json(products);
  }
  catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});


// Recuperar un producto en especifico
router.get('/:id', 
   // Llamamos al middleware validador
   validatorHandler(getProductSchema, "params"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    // Respuesta al cliente del producto
    res.json(product);
  } catch (error) {
    next(error)
  }
});

//crear un producto
router.post('/', 
   // Llamamos al middleware validador con el schema createProductSchema y 
//   // la informacion proviene del body
validatorHandler(createProductSchema, "body"),
  async (req, res) => {
  try {
    const body = req.body;
    const newProduct = await service.create(body);
    res.status(201).json({
      message: 'created',
      data: newProduct,
    });
  }
  catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

//Actualizar un producto

router.patch('/:id', 
  validatorHandler(getProductSchema, "params"),
  validatorHandler(updateProductSchema, "body"),
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.json({
      message: 'update',
      data: product,
      id,
    });
  } catch (error) {
    next(error)
  }
});

//eliminar un producto
router.delete('/:id', 
  validatorHandler(getProductSchema, "params"),  
  async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    res.status(204).json({
      message: 'Element borrado exitososamente',
      id: product.id,
    });
  } catch (error) {
    next(error)
  }

});
module.exports = router;


// Recuperar un producto en especifico
router.get(
  '/:id',
  // Llamamos al middleware validador con el schema getProduct y 
  // la informacion proviene de los parametros
  validatorHandler(getProductSchema, 'params'),
  async (req, res, next) => {
    const { id } = req.params;
    try {
      const product = await service.findOne(id);
      // Respuesta al cliente del producto
      res.json(product);
    } catch (error) {
      next(error);
    }
  }
);

// router.post(
//   '/',
//   // Llamamos al middleware validador con el schema createProductSchema y 
//   // la informacion proviene del body
//   validatorHandler(createProductSchema, 'body'),
//   async (req, res) => {
//     const body = req.body;
//     const newProduct = await service.create(body);

//     res.status(201).json({
//       message: 'created',
//       data: newProduct,
//     });
//   }
// );

// router.patch(
//   '/:id',
//   // Llamamos al middleware validador con el schema getProduct y 
//   // la informacion proviene de los parametros
//   validatorHandler(getProductSchema, 'params'),
//   // Llamamos al middleware validador con el schema updateProduct y 
//   // la informacion proviene de los body
//   validatorHandler(updateProductSchema, 'body'),
//   async (req, res, next) => {
//     const { id } = req.params;
//     const body = req.body;
//     try {
//       const product = await service.update(id, body);
//       res.status(200).json({
//         message: 'update',
//         data: product,
//         id,
//       });
//     } catch (error) {
//       next(error);
//     }
//   }
// );

//En nuestro proyecto y siguiendo clean architecture
//Deberiamos en productsRouters.js manejar los controlaresdonde nos encargamos del routing y los middlewares
//Como primer paso dentro del proceso de una petición a la API el controlador tomaría el control de esa petición
// , dependiendo de la ruta llamada por el usuario ,  junto con los middlewares que son esas piezas de codigo
//  intermedias que se ejecutan antes de que ejecute una respuesta al usuario 