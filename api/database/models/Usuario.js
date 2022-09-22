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
        timestamps: true,
        createdAt: "created_at",
        updatedAt: "updated_at"
    }
    const Usiario = sequelize.define(alias,cols,extra);

    return Usuario;

}