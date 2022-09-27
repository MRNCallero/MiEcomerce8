const express = require('express');
const router = express.Router();
const habilitarMod = require('../middleware/habilitarMod');
const habilitarVis = require('../middleware/habilitarVis');
const verifyToken = require('../middleware/verifyToken');
const { check } = require('express-validator');
const { query } = require('express-validator');
const handleErrors = require('../middleware/handleErrors');
const controller = require('./../controllers/cartController');

router.use(verifyToken);

router.get('/:id', habilitarVis, controller.listCart);

router.put('/:id', habilitarMod, [
    check('id_product', "se debe insertar el id_product y que sea un numer").isInt(),
    check('quantity', "se debe insertar la quantity y debe ser un numero").isInt(),
    handleErrors
],controller.updateCart);


module.exports = router;