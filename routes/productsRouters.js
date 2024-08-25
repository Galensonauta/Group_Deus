const express = require('express'); // Requerir libreria express
const router = express.Router();
const ProductsService = require("./../services/productsService")

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
    })}
  });


// Recuperar un producto en especifico
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.findOne(id);
    // Respuesta al cliente del producto
    res.json(product);
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

});

//crear un producto
router.post('/', async (req, res) => {
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
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const body = req.body;
    const product = await service.update(id, body);
    res.status(200).json({
      message: 'update',
      data: product,
      id,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

//eliminar un producto
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const product = await service.delete(id);
    res.status(204).json({
      message: 'Element borrado exitososamente',
      id: product.id,
    });
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }

});
module.exports = router;

//En nuestro proyecto y siguiendo clean architecture
//Deberiamos en productsRouters.js manejar los controlaresdonde nos encargamos del routing y los middlewares
//Como primer paso dentro del proceso de una petición a la API el controlador tomaría el control de esa petición
// , dependiendo de la ruta llamada por el usuario ,  junto con los middlewares que son esas piezas de codigo
//  intermedias que se ejecutan antes de que ejecute una respuesta al usuario 