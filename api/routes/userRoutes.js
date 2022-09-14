const {Router} = require('express');
const verifyUser = require('../middleware/userMiddleware');
const userController = require('../controllers/userController');
const routes = Router();
const habilitarMod = require('../middleware/habilitarMod');
const habilitarVis = require('../middleware/habilitarVis');
const verifyToken = require('../middleware/verifyToken');
const router = require('./productRoutes');


routes.post('/',userController.crearUsuario);
routes.post('/login',userController.loginUsuario);

router.use(verifyToken)

routes.get('/',userController.listaUsuarios);
routes.get('/:id',habilitarVis,userController.verUsuario);
routes.put('/:id',habilitarMod,userController.modificarUsuario);
routes.delete('/:id',habilitarMod,userController.eliminarUsuario);

module.exports = routes;