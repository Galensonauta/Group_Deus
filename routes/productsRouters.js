const express = require('express'); // Requerir libreria express
const router = express.Router();
const ProductsService= require("./../services/productsService")

// Instanciar servicio productos
const service = new ProductsService();

// Recuperar todos los productos
router.get('/', (req, res) => {
    const products = service.find();
    // Respuesta al cliente
    res.json(products);
  });
  
  // Recuperar un producto en especifico
  router.get('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.findOne(id);
    // Respuesta al cliente del producto
    res.json(product);
  });

  //crear un producto
  router.post('/', (req, res) => {
    const body = req.body;
    const newProduct = service.create(body);  
    res.status(201).json({
      message: 'created',
      data: newProduct,
    });
  });
  
  //Actualizar un producto
  router.patch('/:id', (req, res) => {
    const { id } = req.params;
    const body = req.body;
    const product = service.update(id, body);
    res.status(200).json({
      message: 'update',
      data: product,
      id,
    });
  });
  
  //eliminar un producto
  router.delete('/:id', (req, res) => {
    const { id } = req.params;
    const product = service.delete(id);
    res.status(204).json({
      message: 'delete',
      id: product.id,
    });
  });
module.exports= router;

//En nuestro proyecto y siguiendo clean architecture
//Deberiamos en productsRouters.js manejar los controlaresdonde nos encargamos del routing y los middlewares
//Como primer paso dentro del proceso de una petición a la API el controlador tomaría el control de esa petición
// , dependiendo de la ruta llamada por el usuario ,  junto con los middlewares que son esas piezas de codigo
//  intermedias que se ejecutan antes de que ejecute una respuesta al usuario 