const express = require('express');
const productController = require('./../controllers/productController');
const router = express.Router();

router.get('/', productController.listProducts);

router.get('/:id', productController.findProduct);

router.get('/mostwanted', productController.findMostWanted)

router.get('/', productController.findCategory)

router.post('/', productController.createProduct);

router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;