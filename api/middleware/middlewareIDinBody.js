
function middlewareIDinBody (req,res,next){

    let validacion = false;
    if(req.query.producto && !req.params.id){
        validacion = true;
        req.body.idProducto = req.query.producto; 
    }
    if(req.params.id && !req.query.productos) { 
        validacion = true;
        req.body.idProducto = req.params.id;       
    }
    if(validacion){
        next();
    }else{
        res.status(404).json({
            msj: "Not Found"
        });
    }
}
module.exports = middlewareIDinBody;