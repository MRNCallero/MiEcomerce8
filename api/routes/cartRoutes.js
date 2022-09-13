const express = require('express');
const router = express.Router();
const isGuest = require('../middleware/isGuest');
const isAdmin = require('../middleware/isAdmin');
const isGod = require('../middleware/isGod');


const controller = require('./../controllers/cartController');

router.get('/:id',isGuest, controller.listCart);

router.put('/:id', isGuest,controller.updateCart);

module.exports = router;