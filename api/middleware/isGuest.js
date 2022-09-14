const jwt = require('jsonwebtoken');

const isGuest = ( req,res,next)=> {
    try{
        const token = req.headers.token;
        const {id,ole} = jwt.verify(token, process.env.JWT_MIECOMMERCE);
    
        if(role == "GUEST"){
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