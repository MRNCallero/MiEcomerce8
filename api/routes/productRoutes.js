const express = require('express');

const productController = require('../controllers/productController');
const picturesController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const router = express.Router();
//const { route } = require('./pictureRoutes');

router.get('/:id/pictures',middlewareIDinBody,picturesController.listPictures)

router.get('/', productController.listProducts);

router.get('/search', productController.findKeyWord);

router.get('/mostwanted', productController.findMostWanted);

router.get('/:id', productController.findProduct);

router.put('/:id', productController.editProduct);

router.post('/', productController.createProduct);

router.delete('/delete/:id', productController.deleteProduct);


module.exports = router;