const generateJWT = require('../../helpers/generateJWT');
const db = require('../database/models/index');
const { sequelize } = require('../database/models');
const { where } = require('sequelize');
const Op = db.Sequelize.Op

module.exports = async(req,res,next)=>{
    let {username} = req.body;
    let esta = await db.Usuario.findAll({where:{username:username}});
    if(!esta.length == 0){
        return res.status(400).json({
            ok: false,
            msg: "El username ingresado ya se encuentra registrado"
        });
    }else{
        next();
    }
}