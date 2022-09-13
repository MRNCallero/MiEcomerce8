const jwt = require('jsonwebtoken');

const isGuest = ( req,res,next)=> {
    try{
        const token = req.headers.token;
        const {id,role} = jwt.verify(token, process.env.JWT_MIECOMMERCE);
        const idReq = req.params.id;
  
        if((role == "GUEST" && id == idReq) || role == "GOD"){
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

module.exports = isGuest;