module.exports = (sequelize, dataTypes) => {
    let alias = 'Product'; 
    let cols = {
        id: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        title: {
            type: dataTypes.VARCHAR(255),
            allowNull: false
        },
        price: {
            type: dataTypes.INTEGER,
            allowNull: false
        },
        mostwanted: {
            type: dataTypes.BOOLEAN,
            defaultValue: false
        },
        stock: {
            type: dataTypes.INTEGER,
            defaultValue: 0
        },
        description: {
            type: dataTypes.VARCHAR(255)
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false
    }
    const Product = sequelize.define(alias,cols,config);

    return Product;
};