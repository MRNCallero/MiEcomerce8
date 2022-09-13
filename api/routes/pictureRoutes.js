const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody')


router.get('/:id',middlewareIDinBody,pictureController.listPictureID);

router.get('/',middlewareIDinBody,pictureController.listPictures);

router.post('/',pictureController.create);

router.put('/:id',pictureController.edit);

router.delete('/:id',pictureController.delete);


module.exports = router;