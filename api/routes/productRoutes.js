const express = require('express');
const productController = require('../controllers/productController');
const picturesController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody')
//const { route } = require('./pictureRoutes');
const router = express.Router();

//router.get('/', listProducts);

router.get('/:id/pictures',middlewareIDinBody,picturesController.listPictures)

//router.get('/:id', findProduct);

//router.get('/mostwanted', findMostWanted)

//router.get('?category=ID', findCategory)

//router.post('/', createProduct);

//router.delete('/delete/:id', deleteProduct);

module.exports = router;