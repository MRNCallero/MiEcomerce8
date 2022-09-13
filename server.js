const express = require('express');
require('dotenv').config();
const userRoutes = require('./api/routes/userRoutes');
const productRoutes = require('./api/routes/productRoutes');
const cartRoutes = require('./api/routes/cartRoutes');
// const pictureRoutes = require('./api/routes/pictureRoutes')
// const swaggerUi = require('swagger-ui-express');
// const YAML = require('yamljs');
// const swaggerDocument = YAML.load('./swagger.yaml');
// const cors = require('cors');

//PUERTO
const PORT = 8080;

const app = express();
app.use(express.json());

// app.use('/api/v1/users',userRoutes);
// app.use('/api/v1/products',productRoutes);
// app.use('/api/v1/pictures',pictureRoutes);
app.use('/api/v1/cart',cartRoutes);


app.listen(PORT,()=>{
    console.log('Servidor corriendo en el puerto 8080');
})