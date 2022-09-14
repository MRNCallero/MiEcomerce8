const express = require('express');
const router = express.Router();
const pictureController = require('../controllers/picturesControllers');
const middlewareIDinBody = require('../middleware/middlewareIDinBody');
const isAdmin = require('../middleware/isAdmin');
const isLogged = require('../middleware/isLogged');


router.get('/:id',isLogged,middlewareIDinBody,pictureController.listPictureID);

router.get('/',isLogged,middlewareIDinBody,pictureController.listPictures);

router.post('/',isLogged,isAdmin,pictureController.create);

router.put('/:id',isLogged,isAdmin,pictureController.edit);

router.delete('/:id',isLogged,isAdmin,pictureController.delete);


module.exports = router;