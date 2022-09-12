const express = require('express');
const cartRouter = require('./api/routes/cartRoutes');

const app = express();

app.use(express.json());

app.use('/carts', cartRouter);

app.listen(3000, () => {
    console.log('Listening on port 3000');
})