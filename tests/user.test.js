const request = require('supertest');
const {app, server} = require ('../server');
const db = require ('../api/database/models');
const generateToken = require('../helpers/generateJWT');
afterEach(() => {
    server.close();
 });

describe('POST /',() => {
    test('Debe devolver un código de estado 201, ok : true, msg : Usuario creado y el usuario creado ', async () => {
        const data = {
            "email":"guest@guest.com",
            "username":"guest",
            "password":"guest",
            "firstname":"guest",
            "lastname":"guest"
        }
        const { statusCode, body } = await request(app).post('/api/v1/users/').send(data);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            user:expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String)
                })
        }));
        let i = body.user.id;
        let dest = await db.Usuario.destroy({where:{id:i}})
    });
    test('Debe devolver un código de estado 400, ok : false, msg : Datos requeridos incompletos', async () => {
        const data = {
            "email":"comun@comun.com",
            "username":"guest",
            "password":"guest",
            "firstname":"guest",
            "lastname":"guest"
        }
        const { statusCode, body } = await request(app).post('/api/v1/users/').send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String)
        }));
    });
});
describe('POST /login', () => {
    test('Debe devolver un código de estado 200, succes : true, message : Authorized, id, username y role del usuario, y el token generado', async () => {
        const data = {
            "email":"comun@comun.com",
            "password":"comun"
        }
        const { statusCode, body } = await request(app).post('/api/v1/users/login').send(data);
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            success:expect.any(Boolean),
            message:expect.any(String),
            user:expect.objectContaining({
                    iduser: expect.any(Number),
                    username: expect.any(String),
                    role: expect.any(String)
                }),
            token: expect.any(String)
        }));
    });
    test('Debe devolver un código de estado 401, succes : false, message : Unuthorized', async () => {
        const data = {
            "email":"comun@comun.com",
            "password":"12345"
        }
        const { statusCode, body } = await request(app).post('/api/v1/users/login').send(data);
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            success:expect.any(Boolean),
            message:expect.any(String)
        }))
    });
    test('Debe devolver un código de estado 400, succes : false, message : Es necesario el email y la contraseña', async () => {
        const data = {
            "email":"comun@comun.com"
        }
        const { statusCode, body } = await request(app).post('/api/v1/users/login').send(data);
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            success:expect.any(Boolean),
            message:expect.any(String)
        }))
    });
});
describe('GET /', () => {
    test('GUEST: Debe devolver un código de estado 200 ok:true, msg: Lista de usuarios y la lista de usuarios', async () => {
        const token = await generateToken({role:"GUEST"});
        const { statusCode, body } = await request(app).get('/api/v1/users').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            users:expect.arrayContaining([expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })])
        }));
    });
    test('ADMIN: Debe devolver un código de estado 200 ok:true, msg: Lista de usuarios y la lista de usuarios', async () => {
        const token = await generateToken({role:"ADMIN"});
        const { statusCode, body } = await request(app).get('/api/v1/users').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            users:expect.arrayContaining([expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })])
        }));
    });
    test('GOD: Debe devolver un código de estado 200 ok:true, msg: Lista de usuarios y la lista de usuarios', async () => {
        const token = await generateToken({role:"GOD"});
        const { statusCode, body } = await request(app).get('/api/v1/users').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            users:expect.arrayContaining([expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })])
        }));
    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro lista de usuarios', async () => {
      
    });
});
describe('GET /:id',() => {
    test('Debe devolver un código de estado 200 ok:true, msg: Usuarios id y el usuario buscado', async () => {
        const token = await generateToken({role:"GOD"});
        let i = 2;
        const { statusCode, body } = await request(app).get('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            user:expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })
        }));
    });
    test('Debe devolver un código de estado 200 ok:true, msg: Usuarios id y el usuario buscado', async () => {
        const token = await generateToken({id:3,role:"GUEST"});
        let i = 3;
        const { statusCode, body } = await request(app).get('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            user:expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })
        }));
    });
    test('Debe devolver un código de estado 200 ok:true, msg: Usuarios id y el usuario buscado', async () => {
        const token = await generateToken({role:"ADMIN"});
        let i = 2;
        const { statusCode, body } = await request(app).get('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            user:expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })
        }));
    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro usuario',  async () => {
        const token = await generateToken({role:"GOD"});
        let i = 200;
        const { statusCode, body } = await request(app).get('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String)   
        }));
    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro usuario', async () => {
        const token = await generateToken({role:"ADMIN"});
        let i = 200;
        const { statusCode, body } = await request(app).get('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String)   
        }));
    });  
});
describe('PUT /:id', () => {
    test('GOD Debe devolver un código de estado 200 ok:true, msg: Usuario modificado correctamente y el usuario modificado', async () => {
        const token = await generateToken({role:"GOD"});
        const data = {
            "email":"comun@guest.com",
            "username":"comun",
            "password":"guest",
            "firstname":"guest",
            "lastname":"guest"
        }
        let i = 3;
        const { statusCode, body } = await request(app).put('/api/v1/users/'+i).send(data).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            user:expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String)
                })
        }));
    });
//     test('GUEST Debe devolver un código de estado 200 ok:true, msg: Usuario modificado correctamente y el usuario modificado', async () => {
//         const token = await generateToken({id:3,role:"GUEST"});
//         const data = {
//             "email":"comun@guest.com",
//             "username":"guest",
//             "password":"guest",
//             "firstname":"guest",
//             "lastname":"guest",
//             "role": "GUEST"
//         }
//         let i = 3;
//         const { statusCode, body } = await request(app).post('/api/v1/users/'+i).send(data).auth(token, {type:"bearer"});
//         expect(statusCode).toEqual(200);
//         expect(body).toEqual(expect.objectContaining({
//             ok:expect.any(Boolean),
//             msg:expect.any(String),
//             user:expect.objectContaining({
//                     id: expect.any(Number),
//                     email: expect.any(String),
//                     username: expect.any(String),
//                     first_name: expect.any(String),
//                     last_name: expect.any(String),
//                     profilepic: expect.any(String)
//                 })
//         }));
//     });
    test('Debe devolver un código de estado 404, ok : false, msg : Usuario no encontrado', async () => {
        const token = await generateToken({role:"GOD"});
        const data = {
            "email":"comun@guest.com",
            "username":"guest",
            "password":"guest",
            "firstname":"guest",
            "lastname":"guest"
        }
        let i = 500;
        const { statusCode, body } = await request(app).put('/api/v1/users/'+i).send(data).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }));
    });
    test('Debe devolver un código de estado 401, ok : false, msg : Debe ingresaer al menos una campo que actualizar', async () => {
        const token = await generateToken({role:"GOD"});
        let i = 3;
        const { statusCode, body } = await request(app).put('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }));
    });
    test('Debe devolver un código de estado 400, ok : false, msg : Debe ingresaer un id valido', async () => {
        const token = await generateToken({role:"GOD"});
        const data = {
            "email":"comun@guest.com",
            "username":"guest",
            "password":"guest",
            "firstname":"guest",
            "lastname":"guest"
         }
        let i = 'm';
        const { statusCode, body } = await request(app).put('/api/v1/users/'+i).send(data).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }));
    });
});
describe('DELETE /:id',() => {
    test('Debe devolver un código de estado 200 ok:true, msg: Usuario eliminado correctamente', async () => {
        const token = await generateToken({role:"GOD"});
        let i = 5;
        let { statusCode, body } = await request(app).delete('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
                        ok:expect.any(Boolean),
                        msg:expect.any(String),
                    }));
    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro el usuario id', async () => {
        const token = await generateToken({role:"GOD"});
        let i = 12;
        let { statusCode, body } = await request(app).delete('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
                        ok:expect.any(Boolean),
                        msg:expect.any(String),
                    }));
    });
    test('Debe devolver un código de estado 400, ok : false, msg : Debe ingresar un id valido', async () => {
        const token = await generateToken({role:"GOD"});
        let i = 'm';
        let { statusCode, body } = await request(app).delete('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
                        ok:expect.any(Boolean),
                        msg:expect.any(String),
                    }));
    });
});