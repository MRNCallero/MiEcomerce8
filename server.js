const express = require('express');
require('dotenv').config();
const userRoutes = require('./api/routes/userRoutes');
const productsRoutes = require('./api/routes/productRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
const picturesRoutes = require('./api/routes/pictureRoutes')
const swaggerUi = require('swagger-ui-express');
//const YAML = require('yamljs');
//const swaggerDocument = YAML.load('./swagger.yaml');
//const cors = require('cors');

//PUERTO
const PORT = 8080;

const app = express();

app.get('/api/v1', (req,res) => {res.send(`<h1>Server funcionando en el puerto ${PORT} </h1>`)})
app.use('/api/v1/users',userRoutes);
app.use('/api/v1/products',productsRoutes);
app.use('/api/v1/carts',cartRoutes);
app.use('/api/v1/pictures',pictureRoutes);



app.listen(PORT,()=>{
    console.log('Servidor corriendo en el puerto 8080');

})