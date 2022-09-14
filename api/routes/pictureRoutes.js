const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const isAdmin = require('../middleware/isAdmin');
const verifyToken = require('../middleware/verifyToken');

router.use(verifyToken);

router.get('/:id',middlewareIDinBody,pictureController.listPictureID);

router.get('/',middlewareIDinBody,pictureController.listPictures);

router.post('/',isAdmin,pictureController.create);

router.put('/:id',isAdmin,pictureController.edit);

router.delete('/:id',isAdmin,pictureController.delete);


module.exports = router;