const express = require('express');
require('dotenv').config();
const userController = require('./api/controllers/userController');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const cors = require('cors');
//sequelize
const { sequelize } = require('./api/database/models/index');


//rutas
const userRoutes = require('./api/routes/userRoutes');
const productsRoutes = require('./api/routes/productRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const pictureRoutes = require('./api/routes/pictureRoutes');

//PUERTO
const PORT = 3000;

const app = express();


app.use(express.json());
app.use(cors())

app.use('/api/v1/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.get('/api/v1', (req,res) => {res.send(`<h1>Server funcionando en el puerto ${PORT} </h1>`)})
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/products',productsRoutes);
app.use('/api/v1/carts',cartRoutes);
app.use('/api/v1/pictures',pictureRoutes);

app.post('/api/v1/login', userController.loginUsuario);

app.get('*',(req,res) => res.status(404).json({
    ok:false,
    msg:"Ruta incorrecta"
}));

app.post('*',(req,res) => res.status(404).json({
    ok:false,
    msg:"Ruta incorrecta"
}));

app.put('*',(req,res) => res.status(404).json({
    ok:false,
    msg:"Ruta incorrecta"
}));

app.delete('*',(req,res) => res.status(404).json({
    ok:false,
    msg:"Ruta incorrecta"
}));



/* const server = app.listen(PORT, async() => {
        try {
            await sequelize.authenticate();
            console.log('Connection has been established successfully. Al puerto '+ PORT);
        } catch (error) {
            console.error('Unable to connect to the database:', error);
        }
    }) */

const server = app.listen(0,async function(){
        await sequelize.authenticate();
        console.log("Listening on port " + this.address().port);
    });

module.exports = { app, server };
