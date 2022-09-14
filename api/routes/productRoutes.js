const express = require('express');

const productController = require('../controllers/productController');
const picturesController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const habilitarMod = require('../middleware/habilitarMod');
const habilitarVis = require('../middleware/habilitarVis');
const verifyToken = require('../middleware/verifyToken');


//const { route } = require('./pictureRoutes');

router.use(verifyToken);

router.get('/:id/pictures',middlewareIDinBody,picturesController.listPictures)

router.get('/',productController.listProducts);

router.get('/search', productController.findKeyWord);

router.get('/mostwanted', productController.findMostWanted);

router.get('/:id', productController.findProduct);

router.put('/:id',isAdmin, productController.editProduct);

router.post('/',isAdmin, productController.createProduct);

router.delete('/delete/:id',isAdmin, productController.deleteProduct);


module.exports = router;