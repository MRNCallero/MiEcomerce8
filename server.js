const express = require('express');
require('dotenv').config();
const userRoutes = require('./api/routes/userRoutes');
const pictureRoutes = require('./api/routes/pictureRoutes');
const productsRoutes = require('./api/routes/productRoutes');
const cartRoutes = require('./api/routes/cartRoutes');

//PUERTO
const PORT = 8080;

const app = express();

app.use(express.json());


app.use('/api/v1/users',userRoutes);
app.use('/api/v1/cart',cartRoutes);
app.use('/api/v1/products',productsRoutes);
app.use('/api/v1/pictures',pictureRoutes);


app.listen(PORT,()=>{
    console.log('Servidor corriendo en el puerto' + PORT);})
