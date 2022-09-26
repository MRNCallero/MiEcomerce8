const generateJWT = require('../../helpers/generateJWT');
const db = require('../database/models/index');
const { sequelize } = require('../database/models');
const { where } = require('sequelize');
const Op = db.Sequelize.Op

module.exports = async (req,res,next)=>{
    let {email} = req.body;
    let esta = await db.Usuario.findAll({where:{email:email}})
    console.log(esta);
    if(esta.length == 0 ){
        next();
    }else{
        res.status(400).json({
            ok: false,
            msg: "El email ingresado ya se encuentra registrado"
        });
    }
}