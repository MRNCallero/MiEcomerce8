const express = require('express');
const router = express.Router();
const habilitarMod = require('../middleware/habilitarMod');
const habilitarVis = require('../middleware/habilitarVis');
const verifyToken = require('../middleware/verifyToken');
const { check, body } = require('express-validator');
const { query } = require('express-validator');
const handleErrors = require('../middleware/handleErrors');
const controller = require('./../controllers/cartController');

router.use(verifyToken);

router.get('/:id', habilitarVis, controller.listCart);

router.put('/:id', habilitarMod, [
    body('*.product', "se debe insertar el id_product y que sea un numer").isInt(),
    body('*.quantity', "se debe insertar la quantity y debe ser un numero").isInt(),
    handleErrors
],controller.updateCart);


module.exports = router;