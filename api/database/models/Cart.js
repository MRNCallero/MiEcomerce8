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
        date: {
            type: DataTypes.DATE,
            allowNull: false
        },
        quantity: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }
    const config = {
        timestamps: false,
        createdAt: "date",
        tableName: "Cart",
    };
    const Cart = sequelize.define(alias, cols, config);
    
    return Cart;
}