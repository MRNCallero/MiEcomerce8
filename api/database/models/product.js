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
            type: dataTypes.STRING,
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
            type: dataTypes.STRING
        }
    };
    let config = {
        timestamps: false,
        deletedAt: false
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = models => {
        Product.belongsTo(models.Categoria, {
            as: 'productocategoria',
            foreignKey: 'id_categoria'
        }),
        
        Product.hasMany(models.Picture, {
            as: "picturesproduct",
            foreignKey: 'id'

        }),

        Product.belongsToMany(models.Usuario, {
            foreignKey: 'id_product',
            otherKey: "id_user",
            through: 'Cart'
        })


    }

    return Product;
};