const jwt = require('jsonwebtoken');

const habilitarMod = ( req,res,next)=> {
    const {id,role}= req.jwtauth;
    const idReq = req.params.id;
    if(role == "GOD"){
        next()
    }else if(((req.originalUrl.includes('users') || req.originalUrl.includes('cart')) && id == idReq)){
        next()
    } else if (((req.originalUrl.includes('pictures') || req.originalUrl.includes('products')) && role == "ADMIN")){
        next();
    }else{
        res.status(400).json({
            ok:false,
            error: "No tienes las credenciales necesarias para acceder"
        })
    }    
}

module.exports = habilitarMod;