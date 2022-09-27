const {Router} = require('express');
const { check } = require('express-validator');
const userController = require('../controllers/userController');
const routes = Router();
const habilitarMod = require('../middleware/habilitarMod');
const habilitarVis = require('../middleware/habilitarVis');
const verifyToken = require('../middleware/verifyToken');
const cartController = require('./../controllers/cartController');
const handleEmail = require('../middleware/handleEmail');
const handleUsername = require('../middleware/handleUsername');





routes.post('/',[check('email','Email es un requerimtiento obligatorio').normalizeEmail().isEmail(),handleEmail,
check('userename','Username es un requerimtiento obligatorio').not().isEmpty(),handleUsername,
check('password','Password es un requerimtiento obligatorio').not().isEmpty(),
check('firstname','First name es un requerimtiento obligatorio').not().isEmpty(),
check('lastname','Last name es un requerimtiento obligatorio').not().isEmpty()],userController.crearUsuario);
routes.post('/login',userController.loginUsuario);

routes.use(verifyToken)

routes.get('/:id/cart', habilitarVis, cartController.listCart);
routes.put('/:id/cart', habilitarMod,cartController.updateCart);

routes.get('/',userController.listaUsuarios);
routes.get('/:id',habilitarVis,userController.verUsuario);
routes.put('/:id',habilitarMod,userController.modificarUsuario);
routes.delete('/:id',habilitarMod,userController.eliminarUsuario);

module.exports = routes;