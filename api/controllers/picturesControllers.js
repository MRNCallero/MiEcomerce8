const fs = require('fs');
const path = require('node:path');
const searchPicture = require('../../helpers/searchPicture');
const deletePicture = require('../../helpers/deletePictures');
let readBaseProducts = () => JSON.parse(fs.readFileSync(path.join(__dirname, "/../data/products.json")));
let readBasePictures = () => JSON.parse(fs.readFileSync(path.join(__dirname, "/../data/pictures.json")));
let writeBasePictures = (Pictures) => fs.writeFileSync(path.join(__dirname, "/../data/pictures.json"), JSON.stringify(Pictures));



const controllersPictures = {

    listPictures: (req, res) => {

        try {
            let listaPictures = [];

            const idProducto = Number(req.idProducto);

            //leo las bases de datos
            const Productos = readBaseProducts();
            const Pictures = readBasePictures();
            //encuentro el producto segun el id
            const Producto = Productos.find(elem => elem.id === idProducto);

            if (Producto) {
                //recorro el Gallery del producto si un elemento de la base de datos de pictures tiene el mismo id que el del producto lo agrego a listaProducto
                Producto.gallery.forEach(elem => {
                    const thePicture = searchPicture(Number(elem), Pictures)
                    if (thePicture) listaPictures.push(thePicture);

                })
                if (listaPictures.length > 0) {
                    res.status(200).json({
                        msj: "OK",
                        lista: listaPictures
                    });
                } else {
                    res.status(500).json({
                        msj: "Producto sin Imagenes",
                    });
                }
            } else {
                res.status(404).json({
                    msj: "Not Found"
                });
            }
        } catch (error) {
            console.log(error)
            res.status(500).json({
                msj: "Server Error"
            });
        }
    },
    listPictureID: (req, res) => {

        try {
            const idPicture = req.params.id;
            if (isNaN(idPicture)) return res.status(400).json({ msj: "Bad Request" });
            const Pictures = readBasePictures();
            console.log(Pictures)
            //encuentro la imagen segun el id
            const Picture = searchPicture(Number(idPicture), Pictures);

            if (Picture) {
                res.status(200).json({
                    msj: "OK",
                    lista: Picture
                });
            } else {
                res.status(404).json({
                    msj: "Not Found"
                });
            }
        } catch (error) {
            res.status(500).json({
                msj: "Server Error"
            });
            console.log(error)
        }
    },
    create: (req, res) => {
        try {
            const Pictures = JSON.parse(fs.readFileSync("/Volumes/GoogleDrive-105055649622972425912/Mi unidad/Capacitacion/bootCampl/spreen1/MiEcomerce8/api/data/pictures.json", 'utf8'));

            const id = Pictures.at(-1).id + 1
            const { url, description } = req.body;

            if (!url) return res.status(400).json({ msj: "Bad Request" });

            const newPicture = { id, url }
            if (description) newPicture.description = description;

            Pictures.push(newPicture);

            writeBasePictures(Pictures);

            res.status(201).json({
                msj: "Create",
                picture: newPicture
            });

        } catch (error) {
            res.status(500).json({
                msj: "Server Error "
            });
        }
    },
    edit: (req, res) => {

        const { id, ...restoDeElementos } = req.body;
        const idPicture = req.params.id;
        if (!idPicture || isNaN(idPicture)) {
            return res.status(400).json({
                msj: "Bad Request"
            });
        }
        try {
            const Pictures = readBasePictures();

            if (!searchPicture(Number(idPicture), Pictures)) {
                return res.status(404).json({
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
                msj: "OK",
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
                msj: "Bad Request"
            });
        }
        try {

            const Pictures = readBasePictures()
            console.log(Pictures)
            if (!searchPicture(Number(idPicture), Pictures)) {
                return res.status(404).json({
                    msj: "Not Found"
                });
            }
            const PicturesFiltradas = deletePicture(idPicture, Pictures);

            res.status(200).json({ msj: "Ok", Pictures: PicturesFiltradas });

        } catch (error) {
            console.log(error);
            res.status(500).json({ msj: "Server Error" });
        }
    }

}
module.exports = controllersPictures;