const searchPicture = require('../../helpers/searchPicture');
const deletePicture = require('../../helpers/deletePictures');
//sequelize
const db = require('../database/models/index');
const { sequelize } = require('../database/models');
const { where } = require('sequelize');
const Op = db.Sequelize.Op




const controllersPictures = {

    listPicturesOfProduct:async (req, res) => {
        try {
            const idProducto = Number(req.idProducto);

            const exist = await db.Product.findOne({
                where: { id: idProducto }
             });
             
             if (exist) {
                res.status(500).json({
                    ok: false,
                    msj: `ID:${idProducto} no esta asociado a ningun producto`
                });
             }
            let listOfPictures = await db.Picture.findAll({
                where:{
                    id_Product: idProducto
                }
            })
            if(listOfPictures.length > 0){
                res.status(200).json({
                    ok: true,
                    msj: "Lista de fotos del producto con id " + idProducto,
                    lista: listOfPictures
                });
            }else{
                res.status(200).json({
                    ok: true,
                    msj: "Lista de fotos del producto con id " + idProducto + " esta vacia",
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
    listPictureID: (req, res) => {
        console.log("nooo acaaaars");

        try {
            const idPicture = req.params.id;
            if (isNaN(idPicture)) return res.status(400).json({ msj: "Bad Request" });
            const Pictures = readBasePictures();
            console.log(Pictures)
            //encuentro la imagen segun el id
            const Picture = searchPicture(Number(idPicture));

            if (Picture) {
                res.status(200).json({
                    ok: true,
                    lista: Picture
                });
            } else {
                res.status(404).json({
                    ok: false,
                    msj: "Not Found"
                });
            }
        } catch (error) {
            res.status(500).json({
                ok: false,
                msj: "Server Error"
            });
            console.log(error)
        }
    },
    create: (req, res) => {
        try {
            let Pictures = readBasePictures();

            let id = 1;
            if(Pictures.length>0){
                id = Number(Pictures[Pictures.length-1].id)+ 1;
            }
            const { url, description } = req.body;

            if (!url) return res.status(400).json({ ok: false,msj: "Bad Request" });

            const newPicture = { id, url }
            if (description) newPicture.description = description;

            Pictures.push(newPicture);

            writeBasePictures(Pictures);

            res.status(201).json({
                ok: true,
                picture: newPicture
            });

        } catch (error) {
            res.status(500).json({
                ok: false,
                msj: "Server Error "
            });
        }
    },
    edit: (req, res) => {

        const { id, ...restoDeElementos } = req.body;
        const idPicture = req.params.id;
        if (!idPicture || isNaN(idPicture)) {
            return res.status(400).json({
                ok: false,
                msj: "Bad Request"
            });
        }
        try {
            const Pictures = readBasePictures();

            if (!searchPicture(Number(idPicture))) {
                return res.status(404).json({
                    ok: false,
                    msj: "Not Found"
                });
            }
            let newEl;
            const PicturesActualizados = Pictures.map(picture => {
                if (picture.id === Number(idPicture)) {
                    newEl = { ...picture, ...restoDeElementos };
                    return newEl;
                } else {
                    return picture;
                }
            });

            writeBasePictures(PicturesActualizados);
            res.status(200).json({
                ok: true,
                picture: newEl
            });


        } catch (error) {
            console.log(error)
            res.status(500).json({ msj: "Server Error" });
        }
    },

    delete: (req, res) => {
        const idPicture = req.params.id;
        if (!idPicture || isNaN(idPicture)) {
            return res.status(400).json({
                ok: false,
                msj: "Bad Request"
            });
        }
        try {

            const Pictures = readBasePictures()
            console.log(Pictures)
            if (!searchPicture(Number(idPicture))) {
                return res.status(404).json({
                    ok: false,
                    msj: "Not Found"
                });
            }
            const PicturesFiltradas = deletePicture(idPicture);

            res.status(200).json({ ok: true, pictures: PicturesFiltradas });

        } catch (error) {
            console.log(error);
            res.status(500).json({ ok: false,msj: "Server Error" });
        }
    }

}
module.exports = controllersPictures;