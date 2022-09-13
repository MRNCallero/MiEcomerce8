const fs = require('fs');
const readProdData = () => JSON.parse(fs.readFileSync('api/data/products.json', 'utf8'));
//const helper = require('api/helpers/deletePictures')

const productController = {
    listProducts: (req, res) => {
        try{
            if(req.query.category == undefined){
                const productsJSON = readProdData();
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
        }catch{
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
            if(newProd.title != undefined && newProd.price != undefined && newProd.gallery){ //Preguntar como accedar a las cosas de imagen
                newProd.id = productsJSON.length + 1;
                productsJSON.push(newProd) 
                 
                fs.writeFileSync('./data/products.json', JSON.stringify(productsJSON))
                res.status(201).json({
                   msg: "Producto agregado",
                   ok: true
                })
            }else{
                res.status(400).json({
                   ok: false,
                   msg: 'Producto inválido, debe agregar todos los parametros requeridos'
                })
            }}catch{
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
                const finalList = productsJSON.filter(el => el.id != id)
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
        }catch{
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
            console.log(category);
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
            console.log(keyWord);
            const productsJSON = readProdData();
            listaFiltrada = productsJSON.filter(el => {
                return el.title.includes(keyWord) || el.description.includes(keyWord)
            })
            res.status(200).json({
                ok: true,
                msg: listaFiltrada
            })
        }catch{
            res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor'
        })
        }   
    }

};

module.exports = productController;