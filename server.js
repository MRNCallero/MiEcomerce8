const express = require('express');
require('dotenv').config();
const userRoutes = require('./api/routes/userRoutes');
const pictureRoutes = require('./api/routes/pictureRoutes');
const productsRoutes = require('./api/routes/productRoutes');
const cartRoutes = '';

/*const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const swaggerDocument = YAML.load('./swagger.yaml');
const cors = require('cors');*/


//PUERTO
const PORT = 8080;

const app = express();
app.use(express.json());


app.use('/api/v1/users',userRoutes);
//app.use('/api/v1',productsRoutes);
//app.use('/api/v1',cartRoutes);


//app.use('/api/v1',userRoutes, (req,res) => {`<h1>Server funcionando en el puerto ${PORT} </h1>`});
app.use('/api/v1/products',productsRoutes);
//app.use('/api/v1',cartRoutes);
app.use('/api/v1/pictures',pictureRoutes);


app.listen(PORT,()=>{
    console.log('Servidor corriendo en el puerto' + PORT);


})