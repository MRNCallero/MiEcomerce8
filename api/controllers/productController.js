const e = require('express');
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
                    include: [{association: "productocategoria", attributes:["name"]},{association: "picturesproduct", attributes: ['id','url', 'description']}]
                })
                .then(resultado => {
                    res.status(200).json({
                        ok: true,
                        msg: 'Listado de usuarios',
                        lista: resultado
                    })
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

    findProduct: async (req, res) => {
        try{
            const prodId = req.params.id
 
            const foundProd = await db.Product.findByPk(prodId);

            if(foundProd == undefined){
                res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                })
            }else{
                res.status(200).json({
                    ok: true,
                    msg: 'Producto encontrado', 
                    producto: foundProd
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

    editProduct: async (req, res) => {
        try {
     
            const idProd = req.params.id;
            let prod = await db.Product.findByPk(idProd);
            if(prod == undefined){
                return res.status(404).json({
                    ok: false,
                    msg: 'Producto no encontrado'
                })
            }
            let {title, price, description, category, mostwanted, stock} = req.body;
            let cat;
            if(category){ cat = await db.Categoria.findByPk(category);}
            if(title||price||description||cat||mostwanted||stock!= undefined){
                title? prod.title = title: prod.title=prod.title;
                price? prod.price = price: prod.price=prod.price;
                mostwanted && mostwanted == 1||mostwanted == 0? prod.mostwanted = Number(mostwanted): prod.mostwanted = Number(prod.mostwanted);
                stock>=0? prod.stock = stock: prod.stock = prod.stock;
                description? prod.description = description: prod.description = prod.description;
                cat != undefined? prod.category = category: prod.category = prod.category;
                const resp = await db.Product.update({
                    title : prod.title,
                    price : prod.price,
                    mostwanted : prod.mostwanted,
                    stock : prod.stock,
                    description : prod.description,
                    id_category : prod.category 
                },
                {
                    where : {id : idProd}
                }
                )
                res.status(200).json({
                    ok: true,
                    msg: 'El producto ha sido editado',
                    prdoucto: prod
                })
            }
        } catch (error) {
            console.log(error);
            if(error){ //producto no encontrado
                console.log(error);
            }else if(error){//categoria no encontrada
                console.log(error);
            }else{ //error en updatee
                console.log(error);
            }
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
                },
                include: [{association: "productocategoria", attributes:["name"]},{association: "picturesproduct", attributes: ['id','url', 'description']}]
            }).then(resultado => {
                res.status(200).json({
                    ok: true,
                    msg: 'Listado de productos con mostwanted en 1',
                    listado: resultado
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

    deleteProduct: async (req, res) => {
        try{
            let idParam = req.params.id;
            if(!isNaN(idParam)){               
                const fromCart = await db.Cart.findAll({where:{id_product: idParam}});
                if (fromCart.length == 0){
                    const deleteImg = await db.Picture.destroy({where:{id_product : idParam}});
                    const toDelete = await db.Product.destroy({where:{id : idParam}});

                    if(toDelete != 0){
                        res.status(200).json({
                            ok: true,
                            msg: "Producto borrado correctamente " + toDelete
                        })
                    }else{
                        res.status(404).json({
                            ok:false,
                            msg: 'Producto no encontrado'
                        })
                    }
                }else{
                    res.status(404).json({
                        ok: false,
                        msg: 'Imposible borrar producto. Un usuario o mas lo tiene en su carrito'
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
            /*if (err.parent.code.includes("REFERENCED")){
                return res.status(400).json({
                    ok: false,
                    msg: 'Imposible borrar producto. Un usuario o mas lo tiene en su carrito'
                })
            }*/
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
                include: [{association: 'productocategoria', where: {name: {[Op.like] :'%' + cat + '%'}}},{association: 'picturesproduct'}]
            }).then(result => {
                if(result.length > 0){
                    res.status(200).json({
                        ok: true,
                        msg: 'Productos encontrados correctamente',
                        listado: result
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

    findKeyWord: async (req, res) => {
        try{
            keyWord = req.query.q;
            console.log(keyWord);

            const retByKey = await db.Product.findAll(
                
                {where : {[Op.or]: [
                {title : {[Op.like] :'%' + keyWord + '%'}},
                {description : {[Op.like] :'%' + keyWord + '%'}}
                ]}
            }

            )


            res.status(200).json({
                ok: true,
                msg: 'Productos encontrados correctamente',
                listado: retByKey
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