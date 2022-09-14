const express = require('express');
const router = express.Router();
const habilitarMod = require('../middleware/habilitarMod');
const habilitarVis = require('../middleware/habilitarVis');
const isLogged = require('../middleware/isLogged');

const controller = require('./../controllers/cartController');

router.get('/:id',isLogged,habilitarVis, controller.listCart);

router.put('/:id', isLogged,habilitarMod,controller.updateCart);

module.exports = router;