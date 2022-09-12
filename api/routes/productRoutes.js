const express = require('express');
const productController = require('../controllers/productsController');
const router = express.Router();

router.get('/', listProducts);

router.get('/:id', findProduct);

router.get('/mostwanted', findMostWanted)

router.get('?category=ID', findCategory)

router.post('/', createProduct);

router.delete('/delete/:id', deleteProduct);

module.exports = router;