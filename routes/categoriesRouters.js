const express = require('express'); // Requerir libreria express
// const { faker } = require("@faker-js/faker");
const router = express.Router();
const CategoriesService= require("./../services/categoriesService")

// Instanciar servicio productos
const service = new CategoriesService();

// Recuperar todos los productos
router.get('/', async (req, res,next) => {
  try{    
  const categories = await service.find();
  // Respuesta al cliente
  res.json(categories);
  }catch(err){
    next(err)
  }
});

// Recuperar un producto en especifico
router.get('/:id', async (req, res,next) => {
  try{    
  const { id } = req.params;
  const categories  = await service.findOne(id)
  res.json(categories);
  }catch(err){
    next(err)
  }
})

module.exports= router;