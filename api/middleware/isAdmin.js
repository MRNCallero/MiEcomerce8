const jwt = require('jsonwebtoken');

const isAdmin = ( req,res,next)=> {
    try{
        const {role}= req.jwtauth;
    
        if(role == "ADMIN" || role == "GOD"){
            console.log("Pasaste");
            next();
        }else{
            res.status(400).json({error: "No tienes las credenciales necesarias para acceder"})
        }
    }catch(err){
        console.log(err);
        return res.status(401).json({
            ok: false,
            msg: "Token invalido"
        })
    }
    
}

module.exports = isAdmin;