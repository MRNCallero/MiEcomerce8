module.exports = (sequelize,DataTypes)=>{
    const alias = 'Categoria' 
    const cols = {
        id:{
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true           
        }, 
        name:{
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        }, 
    }
    const extra = {   
        tableName: 'Category',
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
    const Categoria = sequelize.define(alias,cols,extra);
    Categoria.associate = models => {
        Categoria.hasMany(models.Product, {
            foreignKey: 'id_categoria'
        })
    }

    return Categoria;

}