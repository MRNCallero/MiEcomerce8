const express = require('express');

const productController = require('../controllers/productController');
const picturesController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const router = express.Router();
const isAdmin = require('../middleware/isAdmin');
const habilitarMod = require('../middleware/habilitarMod');
const habilitarVis = require('../middleware/habilitarVis');
const isLogged = require('../middleware/isLogged');

//const { route } = require('./pictureRoutes');

router.get('/:id/pictures',isLogged,middlewareIDinBody,picturesController.listPictures)

router.get('/',isLogged, productController.listProducts);

router.get('/search',isLogged, productController.findKeyWord);

router.get('/mostwanted',isLogged, productController.findMostWanted);

router.get('/:id',isLogged, productController.findProduct);

router.put('/:id',isLogged,isAdmin, productController.editProduct);

router.post('/',isLogged,isAdmin, productController.createProduct);

router.delete('/delete/:id',isLogged,isAdmin, productController.deleteProduct);


module.exports = router;