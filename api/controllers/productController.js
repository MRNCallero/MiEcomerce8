const e = require('express');
const removeFromCart= require('../../helpers/removeFromCart')
const deletePictures = require('../../helpers/deletePictures')
const searchPictures = require('../../helpers/searchPicture')
const prodListViewer = require('../../helpers/prodListViewer')
//sequelize
const db = require('../database/models/index');
const { sequelize } = require('../database/models');
const { where } = require('sequelize');
const Categoria = require('../database/models/Categoria');
const Op = db.Sequelize.Op


const productController = {
    listProducts: (req, res) => {
        try{
            if(req.query.category == undefined){
                db.Product.findAll({
                    include: [{association: "picturesproduct"}]
                })
                .then(resultado => {
                    res.status(200).json(resultado)
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
            let productsJSON = readProdData();
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

    createProduct: async(req, res) => {
        let newProd = req.body;
        let cat = await db.Categoria.findByPk(newProd.id_category);
        if(cat == undefined && newProd.id_category != undefined){
            return res.status(400).json({
                ok: false,
                msg: 'El id_category debe existir en la base de datos'
            })
        }
        try{
            if(newProd.title != undefined && newProd.price != undefined){            
                db.Product.create({
                    title: req.body.title,
                    price: req.body.price,
                    mostwanted: req.body.mostwanted,
                    stock: req.body.stock,
                    description: req.body.description,
                    id_category: req.body.id_category
                })
                .then(resultado => {
                    res.status(200).json({
                        ok: true,
                        msg: "El producto fue agregado correctamente"
                    })
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
            let productsJSON = readProdData();
            let prod = productsJSON.find(el => el.id == req.params.id)
            if(prod == undefined){
                return res.status(404).json({
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
            db.Product.findAll({
                where: {
                    mostwanted: 1
                }
            }).then(resultado => {
                res.status(200).json({
                    ok: true,
                    msg: resultado
                })
            })
            
        }catch(err){
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
            let productsJSON = readProdData();
        if(!isNaN(id)){
                const finalList = productsJSON.filter(el => {
                    if(el.id == id){
                        if(el.image != undefined) deletePictures(el.image);
                        el.gallery.forEach(elem => {
                            let i = Number(elem)
                            deletePictures( i)
                        })
                    }
                    return el.id != id
                })

                removeFromCart( Number(id)  );
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
            const cat = req.query.category;
            db.Product.findAll({
                include: [{association: 'productocategoria', where: {name: cat}}]
            }).then(result => {
                if(result.length > 0){
                    res.status(200).json({
                        ok: true,
                        msg: result
                    })  
                }else{
                    res.status(404).json({
                        ok:false,
                        msg: 'No se encontraron productos con esa categoria'
                    })
                }
            })
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
            console.log(keyWord);
            const productsJSON = readProdData();
            console.log(productsJSON);
            let listaFiltrada = productsJSON.filter(el => {
                if(el.category){
                    return (el.title.includes(keyWord) || el.description.includes(keyWord) || el.category.includes(keyWord))
                }else{
                   return (el.title.includes(keyWord) || el.description.includes(keyWord))
                }
            })
            console.log(listaFiltrada);
            listaFiltrada = prodListViewer(listaFiltrada);
            console.log(listaFiltrada);
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