const express = require('express');

const productController = require('../controllers/productController');
const picturesController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody')
//const { route } = require('./pictureRoutes');
const router = express.Router();



router.get('/', productController.listProducts);

router.get('/:id', productController.findProduct);

router.get('/mostwanted', productController.findMostWanted)

router.get('/', productController.findCategory)

router.post('/', productController.createProduct);

router.delete('/delete/:id', productController.deleteProduct);

router.get('/:id/pictures',middlewareIDinBody,picturesController.listPictures)

module.exports = router;