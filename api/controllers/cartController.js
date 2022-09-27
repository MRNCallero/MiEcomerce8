//sequelize
const db = require('../database/models/index');
const { sequelize } = require('../database/models');
const { where } = require('sequelize');
const e = require('cors');
const Op = db.Sequelize.Op


const listCart = async (req, res) => {
    const id = Number(req.params.id);
    try{
        const uCart = await db.Cart.findAll({
            where: {
                id_user: id
            }
        });
        if(uCart.length){
            let retList = [];
            // let index = 0
            for(let index in uCart ){
                console.log(uCart[index]);
                let elem = uCart[index]
                let prod = await db.Product.findByPk(elem.id_product);
                retList[index] = {
                    product: prod,
                    date: elem.date,
                    quantity: elem.quantity
                };
            }
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


const updateStock = async (id, dec) => {
    if(dec === 0){
        return 0;
    }
    let prod = await db.Product.findByPk(id);
    if (!prod){
        return 0;
    } else if (prod.stock - dec < 0){
        await db.Product.increment({stock: (prod.stock*(-1))}, { where: {id : id} });
        return prod.stock;
    } else {
        await db.Product.increment({stock: (dec*(-1))}, { where: {id : id} });
        return dec;
    }

}

const updateCart = async (req, res) => {
    const id = Number(req.params.id);
    try{
        const uCart = await db.Cart.findAll({
            where: {
                id_user: id
            }
        });
        let exist = [];
        const newCart = req.body;
        let diff = 0;
        let quant = 0;
        const today = new Date(Date.now());
        for (let elem in newCart){
            // si el elemento ya estaba en el carrito
            exist = uCart.filter((item) => item.id_product === newCart[elem].product);
            if (exist.length !== 0){
                diff = await updateStock(newCart[elem].product, newCart[elem].quantity - exist[0].quantity);
                if (diff !== 0){
                    await db.Cart.update({ quantity: exist[0].quantity + diff, date: today.toISOString() }, {
                        where: {
                            [Op.and]: [{id_product: newCart[elem].product}, {id_user: id}]
                        }
                    });
                }
            } else {
                // updateStock
                quant = await updateStock(newCart[elem].product, newCart[elem].quantity);
                // si hay que agregar el elemento en el carrito
                await db.Cart.create({
                    id_user: id,
                    id_product: newCart[elem].product,
                    date: today.toISOString(),
                    quantity: quant
                });
            }
        }

        // si hay que borrar el elemento del carrito
        for (let del in uCart){
            exist = newCart.filter((item) => item.product === uCart[del].id_product);
            if(exist.length === 0){
                await updateStock(uCart[del].id_product, ((uCart[del].quantity)*(-1)));
                await db.Cart.destroy({
                    where: {
                        [Op.and]: [{id_product: uCart[del].id_product}, {id_user: id}]
                    }
                });
            }
        }

        res.status(201).json({
            ok: true,
            message: "Cart Updated"
        });

    }catch(error){
        console.log(error);
        res.status(500).json({
            ok: false,
            message: "Error connecting to DB"
        });
    }
}


module.exports = {listCart, updateCart};