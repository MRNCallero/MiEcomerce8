//sequelize
const db = require('../database/models/index');
const { sequelize } = require('../database/models/index');

const controllersPictures = {

    listPicturesOfProduct:async (req, res) => {
        try {
            const idProduct = Number(req.idProducto);
            if (isNaN(idProduct)) return res.status(400).json({ ok: false,msg: "ID del producto incorrecto" });
                let listOfPictures = await db.Picture.findAll({
                    where:{
                        id_Product: idProduct
                    }
                })
                if(listOfPictures.length > 0){
                    res.status(200).json({
                        ok: true,
                        msg: "Lista de fotos del producto con id " + idProduct,
                        lista: listOfPictures
                    });
                }else{
                    res.status(200).json({
                        ok: true,
                        msg: "Lista de fotos del producto con id " + idProduct + " esta vacia",
                    });
                }
            
                
        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Server Error"
            });
                
       }
    },
    listPictureID: async (req, res) => {
            
        try {
            if (isNaN(req.params.id)) return res.status(400).json({ msg: "ID de picture incorrecto" });
            const idPicture = Number(req.params.id);

            const Picture = await db.Picture.findOne({
                where:{
                    id: idPicture
                }
            })
            if (Picture) {
                res.status(200).json({
                    ok: true,
                    msg: "Foto encontrada",
                    lista: Picture
                });
            } else {
                res.status(404).json({
                    ok: false,
                    msg: "Foto no encontrada"
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                msg: "Server Error List ID"
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
                msg: "Foto creada correctamente",
                picture: newPicture
            });

        } catch (error) {
            console.log(error)
            res.status(500).json({
                ok: false,
                msg: "Server Error"
            });
        }
    },
    edit: async (req, res) => {

        const {...elementos } = req.body;
        const idPicture = req.params.id;
        if (!idPicture || isNaN(idPicture)) {
            return res.status(400).json({
                ok: false,
                msg: "ID Picture formato incorrecto"
            });
        }

        try {
           
            const pictureBuscada = await db.Picture.findByPk(Number(idPicture))
            if(!pictureBuscada){
                return res.status(404).json({
                    ok: false,
                    msg: "Picture no encontrada"
                });
            }
            if(req.body.id_product){
                const productExist = await db.Product.findByPk(req.body.id_product);
                if(!productExist){
                    return res.status(404).json({
                        ok: false,
                        msg: `producto con ID:${req.body.id_product} no encontrado`
                    });
                }
            }
            await db.Picture.update({
                ...elementos,
            },{where:{id:idPicture}});
            const pictureEditada = await db.Picture.findByPk(Number(idPicture))
            res.status(200).json({
                ok: true,
                msg: "Picture editada correctamente",
                picture: pictureEditada
            });


        } catch (error) {
            console.log(error)
            res.status(500).json({ msg: "Server Error" });
        }
    },
    delete:async (req, res) => {
        const idPicture = req.params.id;
        if (!idPicture || isNaN(idPicture)) {
            return res.status(400).json({
                ok: false,
                msg: "ID Picture formato incorrecto"
            });
        }
        try {
            
            const pictureBuscada = await db.Picture.findByPk(Number(idPicture))
            if(!pictureBuscada){
                return res.status(404).json({
                    ok: false,
                    msg: "Picture no encontrada"
                });
            }
            if(pictureBuscada){
                await db.Picture.destroy({
                    where: {id:idPicture}
                })
            }
            res.status(200).json({ ok: true, msg: "Picture eliminada, te muestro las fotos de todas las pictures",picture: pictureBuscada });

        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false,msg: "Server Error" });
        }
    }

}
module.exports = controllersPictures;