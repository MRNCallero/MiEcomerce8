const db = require("../api/database/models");


const productExistRoutes = async (id_product) => {

   const exist = await db.Product.findOne({
      where: { id: id_product }
   });
   
   if (!exist) {
      throw new Error(`No se encuentran productos con id ${id_product}`)
   }
}

module.exports = productExistRoutes;