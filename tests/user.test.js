const request = require('supertest');
const {server} = require ('../api');
const models = require ('../api/database/models');
const generateToken = require('../helpers/generateJWT');
const verificarToken = require('../api/middleware/verifyToken');

describe('POST /', () => {
    test('Debe devolver un código de estado 201, ok : true, msg : Usuario creado y el usuario creado ', async () => {});
    test('Debe devolver un código de estado 400, ok : false, msg : Datos requeridos incompletos', async () => {});
});
describe('POST /login', () => {
    test('Debe devolver un código de estado 200, succes : true, message : Authorized, id, username y role del usuario, y el token generado', async () => {});
    test('Debe devolver un código de estado 401, succes : false, message : Unuthorized', async () => {});
    test('Debe devolver un código de estado 400, succes : false, message : Es necesario el email y la contraseña', async () => {});
});
describe('GET /', () => {
    test('Debe devolver un código de estado 200 ok:true, msg: Lista de usuarios y la lista de usuarios', async () => {});
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro lista de usuarios', async () => {});
});
describe('GET /:id', () => {
    test('Debe devolver un código de estado 200 ok:true, msg: Usuarios id y el usuario buscado', async () => {});
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro usuario', async () => {});
});
describe('PUT /:id', () => {
    test('Debe devolver un código de estado 200 ok:true, msg: Usuario modificado correctamente y el usuario modificado', async () => {});
    test('Debe devolver un código de estado 404, ok : false, msg : Usuario no encontrado', async () => {});
    test('Debe devolver un código de estado 401, ok : false, msg : Debe ingresaer al menos una campo que actualizar', async () => {});
    test('Debe devolver un código de estado 400, ok : false, msg : Debe ingresaer un id valido', async () => {});
});
describe('DELETE /:id', () => {
    test('Debe devolver un código de estado 200 ok:true, msg: Usuario eliminado correctamente', async () => {});
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro el usuario id', async () => {});
    test('Debe devolver un código de estado 400, ok : false, msg : Debe ingresar un id valido', async () => {});
});