const {Router} = require('express');
const verifyUser = require('../middleware/userMiddleware');
const userController = require('../controllers/userController');
const routes = Router();
const isGuest = require('../middleware/isGuest');
const isAdmin = require('../middleware/isAdmin');
const isGod = require('../middleware/isGod');

routes.get('/',userController.listaUsuarios);
routes.get('/:id',userController.verUsuario);
routes.post('/',userController.crearUsuario);
routes.post('/login',verifyUser,userController.loginUsuario);
routes.put('/:id',userController.modificarUsuario);
routes.delete('/:id',userController.eliminarUsuario);

module.exports = routes;