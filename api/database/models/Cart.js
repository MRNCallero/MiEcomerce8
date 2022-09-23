module.exports = (sequelize, DataTypes) => {
    const alias = "Cart";
    const cols = {
        id_user: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        id_product: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: true
        }
    }
    const config = {
        timestamps: true,
        createdAt: "date"
    };
    const Cart = sequelize.define(alias, cols, config);
    Cart.associate = (models) => {
        Cart.hasMany(models.Usuario,{
            as: "cartuser",
            foreignKey: "id_user",
        });
        // Cart.associate = (models) => {
        //     Cart.belongsTo(models.Product,{
        //         as: "cartproduct",
        //         foreignKey: "id_product",
        //     })
        // }
   }
    return Cart;
}