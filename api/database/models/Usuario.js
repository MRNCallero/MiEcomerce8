const Cart = require("./Cart");

module.exports = (sequelize,DataTypes)=>{
    const alias = 'Usuario' 
    const cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true           
        }, 
        email:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        username:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
        password:{
            type: DataTypes.STRING,
            allowNull: false
        },
        first_name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        last_name:{
            type: DataTypes.STRING,
            allowNull: true
        },
        profilepic:{
            type: DataTypes.STRING,
            allowNull: true
        },
        role:{
            type: DataTypes.STRING,
            allowNull: false,
            default: "GUEST"
        },
       
    }
    const extra = {   
        tableName: 'User',
        timestamps: false
    }
    const Usuario = sequelize.define(alias,cols,extra);

    Usuario.associate = (models) => {   
        Usuario.belongsToMany(models.Product,{
                foreignKey : 'id_user',
                otherKey: 'id_product',
                through: 'Cart',
                as: 'UserCart'
        })
    }

    return Usuario;

}