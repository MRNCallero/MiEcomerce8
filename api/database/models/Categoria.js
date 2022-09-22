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
        tableName: 'User',
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
    const Categoria = sequelize.define(alias,cols,extra);

    return Categoria;

}