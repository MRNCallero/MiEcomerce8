const express = require('express');

const productController = require('../controllers/productController');
const picturesController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const router = express.Router();
const isGuest = require('../middleware/isGuest');
const isAdmin = require('../middleware/isAdmin');
const isGod = require('../middleware/isGod');
//const { route } = require('./pictureRoutes');

router.get('/:id/pictures',middlewareIDinBody,picturesController.listPictures)

router.get('/',isGuest, productController.listProducts);

router.get('/search',isGuest, productController.findKeyWord);

router.get('/mostwanted',isGuest, productController.findMostWanted);

router.get('/:id',isGuest, productController.findProduct);

router.put('/:id', productController.editProduct);

router.post('/', productController.createProduct);

router.delete('/delete/:id', productController.deleteProduct);


module.exports = router;