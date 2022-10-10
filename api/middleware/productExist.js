const db = require('../database/models/index');

const productExist  = async (req,res,next)=>{
    let idProduct =0;
    if(req.idProducto && !req.body.id_product){
        idProduct = req.idProducto ;
    }
    else if(req.body.id_product && !req.idProducto){
        idProduct = req.body.id_product;
    }else{
        return res.status(404).json({
        ok: false,
        msg: `Error pasando ID`
    });}

    const exist = await db.Product.findOne({
        where: { id: idProduct }
     });
     if (!exist) {
        return res.status(404).json({
            ok: false,
            msg: `ID:${idProduct} no esta asociado a ningun producto`
        });
     }else{
        next();
     }
}
module.exports = productExist;