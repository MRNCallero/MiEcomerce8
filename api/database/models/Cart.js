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
    
    return Cart;
}