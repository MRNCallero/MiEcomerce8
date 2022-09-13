const express = require('express');
const productController = require('../controllers/productController');
const router = express.Router();

router.get('/', productController.listProducts);

router.get('/search', productController.findKeyWord);

router.get('/mostwanted', productController.findMostWanted);

router.get('/:id', productController.findProduct);

router.put('/:id', productController.editProduct);

router.post('/', productController.createProduct);

router.delete('/delete/:id', productController.deleteProduct);

module.exports = router;