const express = require('express'); // Requerir libreria express
// const { faker } = require("@faker-js/faker");
const router = express.Router();

router.get('/:categoryId/products/:productId', (req, res) => {
  const { categoryId, productId } = req.params;
  res.json({
    categoryId,
    productId,
  });
})

module.exports= router