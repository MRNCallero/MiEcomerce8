//sequelize
const db = require('../database/models/index');
const { sequelize } = require('../database/models');
const { where } = require('sequelize');
const Op = db.Sequelize.Op


const listCart = async (req, res) => {
    const id = Number(req.params.id);
    try{
        const uCart = await db.Cart.findAll({
            where: {
                id_user: id
            }
        });
        // console.log(uCart);
        console.log(uCart);
        if(uCart.length){
            let retList = [];

            uCart.forEach(async (elem, index) =>{
                let prod = await db.Product.findByPk(elem.id_product);
                retList[index] = {
                    product: prod,
                    date: elem.date,
                    quantity: elem.quantity
                };
            });
            
            // let foundProd = [];
            // let listaAux = [];
            // cart.cart.forEach(elem =>{
            //         foundProd.push(productsJSON.find(el => {
            //             return el.id == elem.product
            //         }));})
            // listaAux = prodListViewer(foundProd);
            // listaAux = listaAux.map((ele,i)=>{
            //     return {
            //         producto:ele,
            //         quantity:cart.cart[i].quantity
            //     }
            // })
            // if(foundProd == undefined){
            //     res.status(404).json({
            //         ok: false,
            //         msg: 'Producto no encontrado'
            //     })
            // }else{
            //     res.status(200).json(listaAux);
            // }
            res.status(200).json(retList);

        }else{
            res.status(404).json({
                ok: false,
                message: "Cart does not exist"
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Error connecting to DB"
        });
    }
}

const updateCart = (req, res) => {
    const id = Number(req.params.id);
    try{
        const carts = JSON.parse(fs.readFileSync(DB_PATH, 'utf-8'));
        let exist = false;
        let index = 0;
        let updatedCart = carts.map((elem,i) => {
            if(elem.id === id){
                exist = true;
                index = i;
                elem.cart = req.body;
            }
            return elem;
        });
        if(exist){
            fs.writeFileSync(DB_PATH, JSON.stringify(updatedCart),'utf-8');
            res.status(200).json(updatedCart[index].cart);
        }else{
            res.status(404).json({
                ok: false,
                message: "Cart does not exist"
            });
        }
    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Error handling file"
        });
    }

}


module.exports = {listCart, updateCart};