const usersHelpers = require('../../helpers/usersHelpers')
let listaUsuarios = (req,res)=>{
    try{
        let users = usersHelpers.readBaseUsers();
        res.status(200).json({
            "ok": true,
            "users": users,
            "msg": "Ok"
        });
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
        let id = req.params.id;
        let users = usersHelpers.readBaseUsers();
        let ret = users.find((e)=> e.id == id);
        if(ret){
            res.status(200).json({
                "ok": true,
                "msg": "Ok",
                "user": ret
            });
        }else{
            res.status(404).json({
                "ok": false,
                "msg": "Not Found"
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
        let users = usersHelpers.readBaseUsers();
        let id = Number(users[users.length-1].id )+ 1;
        if(email&&username&&password&&firstname&&lastname){
            u = {
                "id":id,
                "email":email,
                "username":username,
                "password":password,
                "firstname":firstname,
                "lastname":lastname,
                "profilepic":profilepic?profilepic:"sin foto"
            }
            users.push(u);
            usersHelpers.writeBaseUsers(users);
            res.status(201).json({
                "ok":false,
                "msg": "Created."
            })
        }else{
            res.status(400).json({
                "ok": false,
                "msg": "Bad Request"
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
        let {email,username,password,firstname,lastname,profilepic}= req.body;
        let users = usersHelpers.readBaseUsers();
        let id = req.params.id;
        let index = users.findIndex((e)=>e.id==id);
        console.log("index " + index);
        console.log("id " + id);
        if (index){
            if(email||username||firstname||lastname||profilepic){
                email? users[index].email = email:users[index]=users[index];
                username? users[index].username = username:users[index].username=users[index].username;
                firstname? users[index].firstname = firstname:users[index].firstname=users[index].firstname;
                lastname? users[index].lastname = lastname:users[index].lastname = users[index].lastname;
                profilepic? users[index].profilepic = profilepic: users[index].profilepic=users[index].profilepic;
                usersHelpers.writeBaseUsers(users);
                res.status(200).json({
                    "ok":false,
                    "msg": "Ok"
                })
            }else{
                res.status(400).json({
                    "ok": false,
                    "msg": "Bad Request"
                });
            }
        }else{
            res.status(404).json({
                "ok": false,
                "msg": "Not Found"
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
                let users = aux.filter((e)=>e.id !== id);
                usersHelpers.writeBaseUsers(users);
                res.status(200).json({
                    "ok": true,
                    "msg": "Ok"
                });
            }else{
                res.status(404).json({
                    "ok": false,
                    "msg": "Not Found"
                });
            }
        }else{
            res.status(400).json({
                "ok": false,
                "msg": "Bad Request"
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

module.exports = {listaUsuarios,verUsuario,crearUsuario,modificarUsuario,eliminarUsuario}