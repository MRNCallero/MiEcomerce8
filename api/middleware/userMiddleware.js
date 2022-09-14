const verifyUser = (req,res,next) =>{
    if(req.body.username && req.body.password){
        next();
    }else{
        res.status(401).json('Ingrese sus credenciales correctamente');
    }
}

module.exports = verifyUser;