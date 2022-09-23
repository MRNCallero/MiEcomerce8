const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const habilitarMod = require('../middleware/habilitarMod');
const verifyToken = require('../middleware/verifyToken');
const habilitarVis = require('../middleware/habilitarVis');
const handleErrors = require('../middleware/handleErrors');
const { check } = require('express-validator');
const { query } = require('express-validator');

//router.use(verifyToken);

router.get('/:id',/*habilitarVis,*/middlewareIDinBody,pictureController.listPictureID);

router.get('/',/*habilitarVis,*/[
    query('product','Se necesita el id del producto').not().isEmpty(),
    handleErrors
],middlewareIDinBody,pictureController.listPicturesOfProduct);

router.post('/',habilitarMod,pictureController.create);

router.put('/:id',habilitarMod,pictureController.edit);

router.delete('/:id',habilitarMod,pictureController.delete);


module.exports = router;