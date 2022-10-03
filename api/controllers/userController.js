const generateJWT = require('../../helpers/generateJWT');
const db = require('../database/models/index');
const { sequelize } = require('../database/models');
const { where } = require('sequelize');
const cart = require('../controllers/cartController')
const Op = db.Sequelize.Op

let loginUsuario = async (req,res)=>{
    try{
        let info = req.body;

        if(!info.email || !info.password){
            return res.status(400).json({
                success: false,
                message: "Es necesario el email y la contraseña",
            })
        }
        let login = await db.Usuario.findOne({
            where: {
                email: info.email,
                password: info.password,
            }
        });

        if(login){
            console.log('login '+ login)
            let aux = {
                id: login.id,
                username : login.username,
                role : login.role
            }   

            const token = await generateJWT(aux);
            
            res.status(200).json({
                success: true,
                message: "Authorized",
                user: {
                    iduser: login.id,
                    username: login.username,
                    role: login.role
                },
                token: token
            } )
        }else{
            res.status(401).json({
                success: false,
                message: "Unauthorized",
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Server Error",
        })
    }
}

let listaUsuarios =  async(req,res)=>{
    try{
        let users = await db.Usuario.findAll({attributes: ['id','email','username','first_name','last_name','profilepic']});
        if(users){
                res.status(200).json({
                "ok": true,
                "msg": "Lista de usuarios",
                "users": users
                
            });
        }else{
            res.status(404).json({
                "ok": false,
                "msg": "No se encontro lista de usuarios"
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            "ok": false,
            "msg": "Server Error"
        });
    }
}
let verUsuario = async (req,res)=>{
    try{
        let index = req.params.id;
        let u = await db.Usuario.findByPk(index);
        if(u){
        let ret = {
            id: u.id,
            email: u.email,
            username: u.username,
            firstname: u.firstname,
            lastname: u.lastname,
            profilepic: u.profilepic
        }
            res.status(200).json({
                "ok": true,
                "msg": "Usuario "+index,
                "user": ret
            });
        }else{
            res.status(404).json({
                "ok": false,
                "msg": "No se encontro usuario"
            });
        }
        
    }catch(e){
        console.log(e);
        res.status(500).json({
            "ok": false,
            "msg": "Server Error"
        });
    }
}


let crearUsuario = async (req,res)=>{
    try{
        let {email,username,password,firstname,lastname,profilepic,role}= req.body;
       if(email&&username&&password&&firstname&&lastname){
            console.log("email: ",email);
            console.log("username ",username);
            role? role : role = "GUEST"
            let u =  await db.Usuario.create({
                "email":email,
                "username":username,
                "password":password,
                "first_name":firstname,
                "last_name":lastname,
                "profilepic":profilepic?profilepic:"sin foto",
                "role": role
            })
            res.status(201).json({
                "ok":true,
                "msg": "Usuario creado",
                "user": u
            })
        }else{
            res.status(400).json({
                "ok": false,
                "msg": "Datos requeridos incompletos"
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            "ok": false,
            "msg": "Server Error"
        });
    }
}

let modificarUsuario = async(req,res)=>{
    try{
        let {email,username,firstname,lastname,profilepic,role}= req.body;
        let id = req.params.id;
            if(email||username||firstname||lastname||profilepic||role){
                email? await db.Usuario.update({email:email},{where:{id : id}}):{};
                username? await db.Usuario.update({username:username},{where:{id : id}}):{};
                firstname? await db.Usuario.update({first_name:firstname},{where:{id : id}}):{};
                lastname? await db.Usuario.update({last_name:lastname},{where:{id : id}}):{};
                profilepic? await db.Usuario.update({profilepic:profilepic},{where:{id : id}}):{};
                role? await db.Usuario.update({role:role},{where:{id : id}}):{};
                let mod = await db.Usuario.findByPk(id);
                if(mod){
                    res.status(200).json({
                        "ok":true,
                        "msg": "Usuario modificado correctamente",
                        "user": mod
                    })
                }else{
                    res.status(404).json({
                        "ok":false,
                        "msg": "Usuario no encontrado"
                    })
                }
            }else{
                res.status(400).json({
                    "ok": false,
                    "msg": "Debe ingresaer al menos una campo que actualizar"
                });
            }
    }catch(e){
        console.log(e);
        res.status(500).json({
            "ok": false,
            "msg": "Server Error"
        });
    }
}

let eliminarUsuario = async (req,res)=>{
    try{
        let id = req.params.id;
        if (id){
                await cart.deleteCart(id);
                let dest = await db.Usuario.destroy({where:{id:id}})
                if(dest){
                    res.status(200).json({
                    "ok": true,
                    "msg": "Usuario eliminado correctamente",
                    "users": dest
                    });
                }else{
                    res.status(404).json({
                        "ok": false,
                        "msg": "No se encontro el usuario " + id
                    });        
                }
        }else{
            res.status(400).json({
                "ok": false,
                "msg": "Debe ingresar un id valido"
            });
        }
    }catch(e){
        console.log(e);
        res.status(500).json({
            "ok": false,
            "msg": "Server Error"
        });
    }
    
}

module.exports = {listaUsuarios,verUsuario,crearUsuario,modificarUsuario,eliminarUsuario,loginUsuario}