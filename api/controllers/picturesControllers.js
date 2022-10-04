//sequelize
const db = require('../database/models/index');

const controllersPictures = {

    listPicturesOfProduct:async (req, res) => {
        try {
            const idProduct = Number(req.idProducto);
            if (isNaN(idProduct)) return res.status(400).json({ ok: false,msj: "ID del producto incorrecto" });
                
                let listOfPictures = await db.Picture.findAll({
                    where:{
                        id_Product: idProduct
                    }
                })
                if(listOfPictures.length > 0){
                    res.status(200).json({
                        ok: true,
                        msj: "Lista de fotos del producto con id " + idProduct,
                        lista: listOfPictures
                    });
                }else{
                    res.status(200).json({
                        ok: true,
                        msj: "Lista de fotos del producto con id " + idProduct + " esta vacia",
                    });
                }
            
                
        } catch (error) {
            console.log(error)
            res.status(500).json({
                                ok: false,
                    msj: "Server Error"
                });
                
            }
    },
    listPictureID: async (req, res) => {
            
        try {
            if (isNaN(req.params.id)) return res.status(400).json({ msj: "ID de picture incorrecto" });
            const idPicture = Number(req.params.id);

            const Picture = await db.Picture.findOne({
                where:{
                    id: idPicture
                }
            })
            if (Picture) {
                res.status(200).json({
                    ok: true,
                    msj: "Foto encontrada",
                    lista: Picture
                });
            } else {
                res.status(404).json({
                    ok: false,
                    msj: "Foto no encontrada"
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                msj: "Server Error List ID"
            });
            console.log(error)
        }
    },
    create: async (req, res) => {
        try {
            
            const { url, id_product, description } = req.body;

            const newPicture = { url, id_product }
            if (description) newPicture.description = description;
            
            await db.Picture.create(newPicture);

            res.status(201).json({
                ok: true,
                msj: "Foto creada correctamente",
                picture: newPicture
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msj: "Server Error"
            });
        }
    },
    edit: async (req, res) => {

        const {...elementos } = req.body;
        const idPicture = req.params.id;
        if (!idPicture || isNaN(idPicture)) {
            return res.status(400).json({
                ok: false,
                msj: "ID Picture formato incorrecto"
            });
        }

        try {
           
            const pictureBuscada = await db.Picture.findByPk(Number(idPicture))
            if(!pictureBuscada){
                return res.status(404).json({
                    ok: false,
                    msj: "Picture no encontrada"
                });
            }
            if(req.body.id_product){
                const productExist = await db.Product.findByPk(req.body.id_product);
                if(!productExist){
                    return res.status(404).json({
                        ok: false,
                        msj: `producto con ID:${req.body.id_product} no encontrado`
                    });
                }
            }
            await db.Picture.update({
                ...elementos,
            },{where:{id:idPicture}});
            const pictureEditada = await db.Picture.findByPk(Number(idPicture))
            res.status(200).json({
                ok: true,
                msj: "Picture editada correctamente",
                picture: pictureEditada
            });


        } catch (error) {
            console.log(error)
            res.status(500).json({ msj: "Server Error" });
        }
    },
    delete:async (req, res) => {
        const idPicture = req.params.id;
        if (!idPicture || isNaN(idPicture)) {
            return res.status(400).json({
                ok: false,
                msj: "ID Picture formato incorrecto"
            });
        }
        try {
            
            const pictureBuscada = await db.Picture.findByPk(Number(idPicture))
            if(!pictureBuscada){
                return res.status(404).json({
                    ok: false,
                    msj: "Picture no encontrada"
                });
            }
            if(pictureBuscada){
                await db.Picture.destroy({
                    where: {id:idPicture}
                })
            }
            const listaPictures = await db.Picture.findAll();
            res.status(200).json({ ok: true, msj: "Picture eliminada, te muestro las fotos de todas las pictures",pictures: listaPictures });

        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false,msj: "Server Error" });
        }
    }

}
module.exports = controllersPictures;