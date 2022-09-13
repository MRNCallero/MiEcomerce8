const {Router} = require('express');
const userController = require('../controllers/userController');
const routes = Router();

routes.get('/users',userController.listaUsuarios);
routes.get('users/:id',userController.verUsuario);
routes.post('/users',userController.crearUsuario);
routes.put('/users/:id',userController.modificarUsuario);
routes.delete('/users/:id',userController.eliminarUsuario);

module.exports = routes;