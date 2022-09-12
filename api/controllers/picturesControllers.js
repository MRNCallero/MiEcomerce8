const fs = require('fs');
let readBaseProducts = ()=>JSON.parse(fs.readFileSync("/Volumes/GoogleDrive-105055649622972425912/Mi unidad/Capacitacion/bootCampl/spreen1/MiEcomerce8/api/data/products.json",'utf8'));
let readBasePictures = ()=>JSON.parse(fs.readFileSync("/Volumes/GoogleDrive-105055649622972425912/Mi unidad/Capacitacion/bootCampl/spreen1/MiEcomerce8/api/data/pictures.json",'utf8'));
let writeBasePictures = (Pictures)=>fs.writeFileSync('/Volumes/GoogleDrive-105055649622972425912/Mi unidad/Capacitacion/bootCampl/spreen1/MiEcomerce8/api/data/pictures.json', JSON.stringify(Pictures));

const controllersPictures = {

    listPictures: (req,res) =>{
        
        try{
            let listaPictures = [];

            const idProducto = req.idProducto;            
            //leo las bases de datos
            const Productos  = readBaseProducts();
            const Pictures  = readBasePictures()
            //encuentro el producto segun el id
            const Producto = Productos.find(elem => elem.id === Number(idProducto));
            if(typeof(Producto)!== "undefined"){
                //recorro el Gallery del producto si un elemento de la base de datos de pictures tiene el mismo id que el del producto lo agrego a listaProducto
                Producto.gallery.forEach(elem => {
                    listaPictures.push( Pictures.find(ele => ele.id === Number(elem)));
                })
                res.status(200).json(listaPictures)
            }else{
                res.status(404).json({
                    msj:"Not Found"
                });
            }
        
        }catch(error){
            res.status(500).json({
                msj:"Server Error a"
            });
            console.log(error);
        }
    },
    listPictureID:(req,res)=>{
        
        try{
            const idProducto = req.params.id;
            //leo las bases de datos
            const Pictures  = readBasePictures();
            //encuentro el producto segun el id
            const Picture = Pictures.find(elem => elem.id === Number(idProducto));
            if(typeof(Picture)!== "undefined"){
                res.status(200).json(Picture)
            }else{
                res.status(404).json({
                    msj:"Not Found"
                });
            }
        }catch(error){
            res.status(500).json({
                msj:"Server Error a"
            });
            console.log(error);
        }
    },
    create: (req,res) => {
        try{
            const Pictures  = JSON.parse(fs.readFileSync("/Volumes/GoogleDrive-105055649622972425912/Mi unidad/Capacitacion/bootCampl/spreen1/MiEcomerce8/api/data/pictures.json",'utf8'));
            const idPicture = Pictures.at(-1).id + 1 
            const { url , description } = req.body;

            if(!url)return res.status(400).json({msj:"Bad Request"});
            const newPicture = { idPicture , url}
            if(description) newPicture.description = description;

            Pictures.push(newPicture);
            writeBasePictures(newPicture)
            res.send(newPicture)
            
        }catch(error){
            res.status(500).json({
                msj:"Server Error a"
            });
            console.log(error);
        }
    },
    edit: (req, res) => {

        const { id, ...restoDeElementos } = req.body;
        const idPicture = req.params.id;
        try {            
            const Pictures = JSON.parse(fs.readFileSync("/Volumes/GoogleDrive-105055649622972425912/Mi unidad/Capacitacion/bootCampl/spreen1/MiEcomerce8/api/data/pictures.json",'utf8'));
            if(!idPicture||isNaN(idPicture)){
                return res.status(400).json({
                    msj:"Bad Request"
                });
            }
            if(!Pictures.find(elem => elem.id ===  Number(idPicture))){
                return res.status(404).json({
                            msj:"Not Found"
                        });
            }
            const PicturesActualizados = Pictures.map(picture => {
              if (picture.id === Number(idPicture)) {
                 const newEl = { ...picture, ...restoDeElementos };
                 return newEl;
              } else {
                return picture;
              }
            });
           

            
               fs.writeFileSync('/Volumes/GoogleDrive-105055649622972425912/Mi unidad/Capacitacion/bootCampl/spreen1/MiEcomerce8/api/data/pictures.json', JSON.stringify(PicturesActualizados));  
               res.send(PicturesActualizados);

     
        } catch (error) {
           console.log(error);
           res.status(500).json({msj:"Server Error"});
        }
     },
     delete: (req, res) => {
        const idPicture  = req.params.id;
        if(!idPicture||isNaN(idPicture)){
            return res.status(400).json({
                msj:"Bad Request"
            });
        }

        try {
            const Pictures = JSON.parse(fs.readFileSync("/Volumes/GoogleDrive-105055649622972425912/Mi unidad/Capacitacion/bootCampl/spreen1/MiEcomerce8/api/data/pictures.json",'utf8'));

            if(!Pictures.find(elem => elem.id ===  Number(idPicture))){
                return res.status(404).json({
                            msj:"Not Found"
                        });
            }
           const PicturesFiltradas = Pictures.filter(el => el.id !== Number(idPicture));
           fs.writeFileSync('/Volumes/GoogleDrive-105055649622972425912/Mi unidad/Capacitacion/bootCampl/spreen1/MiEcomerce8/api/data/pictures.json', JSON.stringify(PicturesFiltradas));  
           res.status(200).json({msj:"Ok", PicturesFiltradas});
     
        } catch (error) {
           console.log(error);
           res.status(500).json({msj:"Server Error"});
        }
     }


}
module.exports = controllersPictures;