const express = require('express');

const productController = require('../controllers/productController');
const picturesController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const router = express.Router();
const habilitarMod = require('../middleware/habilitarMod');
const habilitarVis = require('../middleware/habilitarVis');
const verifyToken = require('../middleware/verifyToken');
const { check } = require('express-validator');
const { query } = require('express-validator');
const handleErrors = require('../middleware/handleErrors');

//const { route } = require('./pictureRoutes');


//ACORDARSE DE DESCOMENTAR ESTO

router.use(verifyToken);


router.get('/:id/pictures',middlewareIDinBody,picturesController.listPicturesOfProduct)

router.get('/',productController.listProducts);

router.get('/search', [
    query('q', 'Se necesita una KeyWord para hacer la busqueda').not().isEmpty(),
    handleErrors
],productController.findKeyWord);

router.get('/mostwanted', productController.findMostWanted);

router.get('/:id', productController.findProduct);

router.put('/:id',habilitarMod, productController.editProduct);

router.post('/',habilitarMod, [
    check('title', 'Es necesario que el producto tenga un title').not().isEmpty().isString(),
    check('price','Es necesario que el producto tenga un price y sea un numero').isInt(),
    check('id_category', 'Es necesario ingresar un id_categoria').isInt(),
    handleErrors
],productController.createProduct);

router.delete('/:id',habilitarMod, productController.deleteProduct);


module.exports = router;