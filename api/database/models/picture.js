


    module.exports = (sequelize, DataTypes) =>{

        const alias = "Picture";
        const col ={
            id:{
                type: DataTypes.INTEGER,
                
                primaryKey: true,
                autoIncrement: true
            },
            url:{
                type: DataTypes.STRING
            },
            description:{
                type: DataTypes.STRING,
                allowNull: true
            }

        }
        const extra = {
            timestamps: false,
            tableName: "Picture",
        }

        const Picture = sequelize.define(alias,col,extra);
        Picture.associate = (models) => {
            Picture.belongsTo(models.Product,{
                as: "FotoProducto",
                foreignKey: "id_product",
            })
        }

        return Picture;
    }