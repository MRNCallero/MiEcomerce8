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
            type: dataTypes.TINYINT(1),
            defaultValue: 0
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
        tableName: 'Product',
        timestamps: false,
        deletedAt: false,
        tableName: "Product",
    }
    const Product = sequelize.define(alias,cols,config);

    Product.associate = models => {
        Product.belongsTo(models.Categoria, {
            as: 'productocategoria',
            foreignKey: 'id_category'
        }),
        
        Product.hasMany(models.Picture, {
            as: "picturesproduct",
            foreignKey: 'id'
        }),

        Product.belongsToMany(models.Usuario, {
            foreignKey: 'id_product',
            otherKey: "id_user",
            through: 'Cart',
            as: "productscarrito"
        })

    }

    return Product;
};