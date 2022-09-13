const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const isGuest = require('../middleware/isGuest');
const isAdmin = require('../middleware/isAdmin');
const isGod = require('../middleware/isGod');


router.get('/:id',middlewareIDinBody,pictureController.listPictureID);

router.get('/',isGuest,middlewareIDinBody,pictureController.listPictures);

router.post('/',pictureController.create);

router.put('/:id',pictureController.edit);

router.delete('/:id',pictureController.delete);


module.exports = router;