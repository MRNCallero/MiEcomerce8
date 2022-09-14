const e = require('express');
const fs = require('fs');
const readProdData = () => JSON.parse(fs.readFileSync('api/data/products.json', 'utf8'));
const removeFromCart= require('../../helpers/removeFromCart')
const deletePictures = require('../../helpers/deletePictures')
const searchPictures = require('../../helpers/searchPicture')
const prodListViewer = require('../../helpers/prodListViewer')

const productViewer = (prodList) => {
    
}


const productController = {
    listProducts: (req, res) => {
        try{
            if(req.query.category == undefined){
                let productsJSON = readProdData();
                productsJSON = prodListViewer(productsJSON)
                res.status(200).json({
                ok: true,
                msg: productsJSON
                })
            }else{
                productController.findCategory(req, res);
            }
        }catch(err){
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor'
            })
        }
    },

    findProduct: (req, res) => {
        try{
            const prodId = req.params.id
            const productsJSON = readProdData();
            let foundProd = productsJSON.find(el => {
                return el.id == prodId
            });
            let listaAux = []
            listaAux.push(foundProd)
            foundProd = prodListViewer(listaAux);
            if(foundProd == undefined){
                res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                })
            }else{
                res.status(200).json({
                    ok: true,
                    msg: foundProd
                })
            }
        }catch(err){
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor'
            })
        }
    },

    createProduct: (req, res) => {
        const productsJSON = readProdData();
        try{
            let newProd = req.body
            if(newProd.title != undefined && newProd.price != undefined && newProd.gallery.length > 0){ 
                newProd.id = productsJSON.at(-1).id + 1;
                if(newProd.image){
                    if(!searchPictures(newProd.image)){
                        return res.status(400).json({
                            ok: false,
                            msg: "Foto inexistente en la imagen principal"
                        })
                    }
                }
                newProd.gallery.forEach(el => {
                    if(!searchPictures(Number(el))){
                        return res.status(400).json({
                            ok: false,
                            msg: "Foto inexistente en el gallery"
                        })
                    }
                })
                productsJSON.push(newProd) 
                
                fs.writeFileSync('api/data/products.json', JSON.stringify(productsJSON))
                res.status(201).json({
                   msg: "Producto agregado",
                   ok: true
                })
            }else{
                res.status(400).json({
                   ok: false,
                   msg: 'Producto inválido, debe agregar todos los parametros requeridos'
                })
            }}catch(err){
                console.log(err);
                res.status(500).json({
                    ok: false,
                    msg: 'Error interno del servidor'
           })
        }
    },

    editProduct: (req, res) => {
        try {
            const productsJSON = readProdData();
            let prod = productsJSON.find(el => el.id == req.params.id)
            if(prod == undefined){
                res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                })
            }
            let {title, price, description, category, mostwanted, image, gallery, stock} = req.body;
            if(title||price||description||category||mostwanted||image||gallery||stock){
                title? prod.title = title: prod.title=prod.title
                price? prod.price = price: prod.price=prod.price
                description? prod.description = description: prod.description = prod.description
                category? prod.category = category: prod.category = prod.category
                mostwanted? prod.mostwanted = mostwanted: prod.mostwanted = prod.mostwanted
                image? prod.image = image: prod.image = prod.image
                gallery? prod.gallery = gallery: prod.gallery = prod.gallery
                stock? prod.stock = stock: prod.stock = prod.stock
                fs.writeFileSync('api/data/products.json', JSON.stringify(productsJSON))
                res.status(200).json({
                    ok: true,
                    msg: prod
                })
            }
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor'
            })
        }
    },

    findMostWanted: (req, res) => {
        try{
            const productsJSON = readProdData();
            let finalList = productsJSON.filter(el => el.mostwanted)
            finalList = prodListViewer(finalList);
            res.status(200).json({
                ok: true,
                msg: finalList
        })}catch(err){
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor'
            })
        }
    },

    //Falta borrar las imagenes tambien y quitarse el producto de todos los carritos
    deleteProduct: (req, res) => {
        try{
            let id = req.params.id
            const productsJSON = readProdData();
            if(id != Number){
                const finalList = productsJSON.filter(el => {
                    if(el.id == id){
                        if(el.image != undefined) deletePictures(el.image);
                        el.gallery.forEach(elem => {
                            deletePictures(Number(elem))
                        })
                    }
                    return el.id != id
                })

                removeFromCart(Number(id));
                fs.writeFileSync('api/data/products.json', JSON.stringify(finalList))
                if(finalList.length != 0){
                    res.status(200).json({
                        ok: true,
                        msg: finalList
                })}else{
                    res.status(404).json({
                        ok:false,
                        msg: 'Producto no encontrado'
                    })
                }
            }else{
                res.status(400).json({
                    ok:false,
                    msg: 'Escriba un id correcto'
                })
            }
        }catch(err){
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor'
            })
        }
    },

    findCategory: (req, res) => {
        try{
            const productsJSON = readProdData();
            const category = req.query.category;
            let finalList = productsJSON.filter(el => el.category == category)
            finalList = prodListViewer(finalList);
            if(finalList.length != 0){
                res.status(200).json({
                    ok: true,
                    msg: finalList
                })
            }else{
                res.status(404).json({
                    ok: false,
                    msg: 'No se encontraron productos'
                })
            }
        }catch{
            res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor'
            })
        }
    },

    findKeyWord: (req, res) => {
        try{
            keyWord = req.query.q;
            const productsJSON = readProdData();
            let listaFiltrada = productsJSON.filter(el => {
                if(el.category){
                    return (el.title.includes(keyWord) || el.description.includes(keyWord) || el.category.includes(keyWord))
                }else{
                   return (el.title.includes(keyWord) || el.description.includes(keyWord))
                }
            })
            listaFiltrada = prodListViewer(listaFiltrada);
            res.status(200).json({
                ok: true,
                msg: listaFiltrada
            })
        }catch(err){
            console.log(err);
            res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor'
        })
        }   
    }

};

module.exports = productController;