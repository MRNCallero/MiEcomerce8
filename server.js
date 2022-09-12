require('dotenv').config();
const express = require('express');
const usersRoutes = require('./api/routes/userRoutes')
const app = express();
app.use(express.json());
app.get('/',(req,res)=>res.status(200).json({"msg":"Bienvenidos!"}));
app.use(usersRoutes);
app.listen(30000, ()=>console.log('>>>> server running... >>>>'))

