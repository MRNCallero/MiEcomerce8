const request = require('supertest');
const {app, server} = require ('../server');
const db = require ('../api/database/models');
const generateToken = require('../helpers/generateJWT');
const verificarToken = require('../api/middleware/verifyToken');

describe('POST /', () => {
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
                    password: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String)
                })
        }));
    });
    test('Debe devolver un código de estado 400, ok : false, msg : Datos requeridos incompletos', async () => {
        const data = {
            "email":"guest@guest.com",
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
            "email":"guest@guest.com",
            "password":"guest"
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
            "email":"guest@guest.com",
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
            "email":"guest@guest.com"
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
    test('Debe devolver un código de estado 200 ok:true, msg: Lista de usuarios y la lista de usuarios', async () => {

    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro lista de usuarios', async () => {

    });
});
describe('GET /:id', () => {
    test('Debe devolver un código de estado 200 ok:true, msg: Usuarios id y el usuario buscado', async () => {

    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro usuario', async () => {

    });
});
describe('PUT /:id', () => {
    test('Debe devolver un código de estado 200 ok:true, msg: Usuario modificado correctamente y el usuario modificado', async () => {

    });
    test('Debe devolver un código de estado 404, ok : false, msg : Usuario no encontrado', async () => {

    });
    test('Debe devolver un código de estado 401, ok : false, msg : Debe ingresaer al menos una campo que actualizar', async () => {

    });
    test('Debe devolver un código de estado 400, ok : false, msg : Debe ingresaer un id valido', async () => {

    });
});
describe('DELETE /:id', () => {
    test('Debe devolver un código de estado 200 ok:true, msg: Usuario eliminado correctamente', async () => {

    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro el usuario id', async () => {

    });
    test('Debe devolver un código de estado 400, ok : false, msg : Debe ingresar un id valido', async () => {

    });
});