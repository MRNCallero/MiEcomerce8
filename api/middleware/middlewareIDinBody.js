
function middlewareIDinBody (req,res,next){
    let validacion = false;
    let idProduct = -2563;
    if(req.query.product && !req.params.id){
        validacion = true;
        idProduct = req.query.product; 
    }
    if(req.params.id && !req.query.producto) { 
        validacion = true;
        idProduct = req.params.id; 
   
    }

    if(idProduct != -2563 && !isNaN(idProduct)){
        req.idProducto = idProduct
        next();
    }else if(isNaN(idProduct)){
        return res.status(400).json({
            ok:false,
            msg: "ID ingresado en formato incorrecto"
        });
    }
    else{
        return res.status(400).json({
            ok:false,
            msg: "No se ingreso un ID"
        });
    }
    
}
module.exports = middlewareIDinBody;