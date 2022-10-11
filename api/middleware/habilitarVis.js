const jwt = require('jsonwebtoken');

const habilitarVis = ( req,res,next)=> {
    const {id,role}= req.jwtauth;
    const idReq = req.params.id;

    if(((req.originalUrl.includes('users') || req.originalUrl.includes('cart')) && id == idReq) || role == "ADMIN" || role == "GOD"){
        next();
    }else{
        res.status(403).json({error: "No tienes las credenciales necesarias para acceder"})
    }    
}

module.exports = habilitarVis;