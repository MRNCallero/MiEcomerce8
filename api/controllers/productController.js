const fs = require('fs');

const productController = {
    listProducts: (req, res) => {
        try{
            const productsJSON = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'))
            res.status(200).json({
            ok: true,
            msg: productsJSON
        })
        }catch{
            res.status(500).json({
                ok: false,
                msg: 'Error interno del servidor'
            })
        }
    },

    findProduct: (req, res) => {
        try{
            const prodId = req.params.id
            const productsJSON = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'))
            let foundProd = productsJSON.find(el => {
                return el.id == prodId
            });
            if(foundProd.length == 0){
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
        const productsJSON = JSON.parse(fs.readFileSync('./db/products.json', 'utf8'))
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

    },

    findMostWanted: (req, res) => {
        try{
            const productsJSON = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
            const MostWanted = productsJSON.filter(el => {
                el.mostwanted == true;
            })
            res.status(200).json({
                ok: true,
                msg: MostWanted
        })}catch{
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
            const productsJSON = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
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
            const productsJSON = JSON.parse(fs.readFileSync('./data/products.json', 'utf8'));
            const category = req.query
            finalList = productsJSON.filter(el => el.category == category)
            if(finalList != 0){
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
    }}
};

module.exports = productController;