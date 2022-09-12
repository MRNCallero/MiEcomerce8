const fs = require('fs');
DB_PATH = "data/cart.json";

const listCart = (req, res) => {
    const id = Number(req.params.id);
    try{
        const carts = fs.readFileSync(DB_PATH, 'utf-8');
        const cart = carts.find((elem) => elem.user === id);
        if(cart){
            res.status(200).json(cart.cart);
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
            message: "Error opening file"
        });
    }
}

const updateCart = (req, res) => {
    const id = Number(req.params.id);
    try{
        const carts = fs.readFileSync(DB_PATH, 'utf-8');
        // const cart = carts.find((elem) => elem.user === id);
        let exist = false;
        let index = 0;
        let updatedCart = carts.map((elem,i) => {
            if(elem.user === id){
                exist = true;
                index = i;
                elem.cart = req.body;
            }
            return elem;
        });
        if(exist){
            fs.writeFileSync(DB_PATH, updatedCart);
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