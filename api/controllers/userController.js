const generateJWT = require('../../helpers/generateJWT');
const usersHelpers = require('../../helpers/usersHelpers');
const db = require('../database/models/index');
const { sequelize } = require('../database/models');
const { where } = require('sequelize');
const Op = db.Sequelize.Op

let loginUsuario = async (req,res)=>{
    try{
        let info = req.body;
        let login = db.Usuario.findOne({
            where: {
                email: info.email,
                password: info.password,
            }
        });

        if(login){
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
            res.status(500).json({
                success: false,
                message: "Unauthorized",
            })
        }
    }catch(err){

    }
}

let listaUsuarios = (req,res)=>{
    try{
        let users = db.Usuario.findAll();
        if(users){
            let ret = [];
            users.forEach(e =>{
                let {id,email,username,firstname,lastname,profilepic} = e;
                let aux = {
                    id: id,
                    email: email,
                    username: username,
                    firstname:firstname,
                    lastname:lastname,
                    profilepic:profilepic
                }
                ret.push(aux)
            })
            res.status(200).json({
                "ok": true,
                "msg": "Lsita de usuarios",
                "users": ret
                
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
let verUsuario = (req,res)=>{
    try{
        let index = req.params.id;
        let {id,email,username,firstname,lastname,profilepic} = db.Usuario.findByPk(index);
        let ret = {
            id: id,
            email: email,
            username: username,
            firstname:firstname,
            lastname:lastname,
            profilepic:profilepic
        }
        if(ret){
            res.status(200).json({
                "ok": true,
                "msg": "Usuario "+id,
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


let crearUsuario = (req,res)=>{
    try{
        let {email,username,password,firstname,lastname,profilepic}= req.body;
       if(email&&username&&password&&firstname&&lastname){
            let u = db.Usuario.create({
                "email":email,
                "username":username,
                "password":password,
                "firstname":firstname,
                "lastname":lastname,
                "role":"GUEST",
                "profilepic":profilepic?profilepic:"sin foto",
                "cart":[]
            })
            res.status(201).json({
                "ok":true,
                "msg": "Usuario creado",
                "user": u
            })
        }else{
            res.status(400).json({
                "ok": false,
                "msg": "Dato requeridos incompletos"
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

let modificarUsuario = (req,res)=>{
    try{
        let {email,username,firstname,lastname,profilepic,role}= req.body;
        let id = req.params.id;
            if(email||username||firstname||lastname||profilepic||role){
                email? db.Usuario.update({email:email},{where:{id : id}}):{};
                username? users[index].username = username:users[index].username=users[index].username;
                firstname? users[index].firstname = firstname:users[index].firstname=users[index].firstname;
                lastname? users[index].lastname = lastname:users[index].lastname = users[index].lastname;
                profilepic? users[index].profilepic = profilepic: users[index].profilepic=users[index].profilepic;
                role? users[index].role = role: users[index].role=users[index].role;
                usersHelpers.writeBaseUsers(users);
                res.status(200).json({
                    "ok":false,
                    "msg": "Usuario modificado correctamente",
                    "user": users[index]
                })
            }else{
                res.status(400).json({
                    "ok": false,
                    "msg": "Debe pasr al menos una campo que actualizar"
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

let eliminarUsuario = (req,res)=>{
    try{
        let id = req.params.id;
        if (id){
            let aux = usersHelpers.readBaseUsers();
            if(aux.filter((e)=>e.id)){
                let users = aux.filter((e)=>e.id != id);
                usersHelpers.writeBaseUsers(users);
                res.status(200).json({
                    "ok": true,
                    "msg": "Usuario eliminado correctamente",
                    "users": users[id]
                });
            }else{
                res.status(404).json({
                    "ok": false,
                    "msg": "No se encontro el usuario"
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