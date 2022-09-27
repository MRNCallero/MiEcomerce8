const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const habilitarMod = require('../middleware/habilitarMod');
const verifyToken = require('../middleware/verifyToken');
const habilitarVis = require('../middleware/habilitarVis');
const handleErrors = require('../middleware/handleErrors');
const productExist = require('../middleware/productExist')

const { check } = require('express-validator');
const { query } = require('express-validator');

router.use(verifyToken);

router.get('/:id',habilitarVis,productExist,pictureController.listPictureID);

router.get('/',habilitarVis,[
    query('product', 'Se necesita el id del producto').not().isEmpty(),
    handleErrors
], middlewareIDinBody, productExist,pictureController.listPicturesOfProduct);

router.post('/',habilitarMod,
    [
        check('url', 'Es necesaria una url en la creacion de imagenes').not().isEmpty(),
        check('id_product', 'Es necesario ingresar la id de un producto').not().isEmpty(),       
        handleErrors
    ],
    productExist,
    pictureController.create);

router.put('/:id',habilitarMod,pictureController.edit);

router.delete('/:id',habilitarMod,pictureController.delete);

module.exports = router;