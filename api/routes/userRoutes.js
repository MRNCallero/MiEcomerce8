const {Router} = require('express');
const userController = require('../controllers/userController');
const routes = Router();

routes.get('/',userController.listaUsuarios);
routes.get('/:id',userController.verUsuario);
routes.post('/',userController.crearUsuario);
routes.put('/:id',userController.modificarUsuario);
routes.delete('/:id',userController.eliminarUsuario);

module.exports = routes;