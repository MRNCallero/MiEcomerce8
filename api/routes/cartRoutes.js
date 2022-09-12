const express = require('express');
const router = express.Router();

const controller = require('./../controllers/cartController');

router.get('/:id', controller.listCart);

router.put('/:id', controller.updateCart);

module.exports = router;