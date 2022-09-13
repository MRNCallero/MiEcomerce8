const fs = require('fs');
const controllersPictures = {

    listPictures: (req,res) =>{
        const idProducto = req.body.idProducto;
        try{

            let db = JSON.parse(fs.readFileSync('../data/productos.json'),'utf8');
            const Producto = db.find(elem => elem.id === Number(idProducto));
            res.send(Producto.gallery);
        }catch(error){
            console.log(error);
            
        }

    },
    listPictureID:(req,res)=>{
        let picture;
        const idPicture = req.params.id;
        let db = JSON.parse(fs.readFileSync(__dirname + '/db.json'),'utf8');
        db.forEach(element => {
            picture = element.gallery.find(elem => elem.id === Number(idPicture));
        })
        if(pictures){
            res.send(picture);
        }else{
            res.status(404).json({
                msj:"Not Found"
            })
        }
    },
    create: (req,res) => {

    }


}
