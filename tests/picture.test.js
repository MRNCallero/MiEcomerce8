/* const request = require('supertest');
const { app, server } = require('../server');
const generateJWT = require('../helpers/generateJWT');
const db = require('../api/database/models');


afterEach(() => {
    server.close();
 });
 
 describe('GET /api/v1/pictures', () => {

    test('Usuario GOD - Debe devolver una lista con todas las pictures de un producto', async ()=>{
        const token = await generateJWT({role: 'GOD'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:2}).auth(token, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),
            lista:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    url:expect.any(String),
                    id_product:expect.any(Number)
                })
            ])
        }))
    })
    test('Usuario GOD - Se pasanda un id que no existe devolver un mensaje informando que no existe el producto', async ()=>{
        const token = await generateJWT({role: 'GOD'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:90000}).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),

        }))
    });
    test('Usuario GOD - Se pasanda un id de un producto que no tiene imagenes', async ()=>{
        const token = await generateJWT({role: 'GOD'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:13}).auth(token, {type:"bearer"});
        console.log(statusCode)
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),

        }))
    });

    test('Usuario ADMIN - Debe devolver una lista con todas las pictures de un producto', async ()=>{
        const token = await generateJWT({role: 'ADMIN'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:2}).auth(token, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),
            lista:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    url:expect.any(String),
                    id_product:expect.any(Number)
                })
            ])
        }))
    })
    test('Usuario ADMIN - Se pasanda un id que no existe devolver un mensaje informando que no existe el producto', async ()=>{
        const token = await generateJWT({role: 'ADMIN'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:90000}).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),

        }))
    });
    test('Usuario ADMIN - Se pasanda un id de un producto que no tiene imagenes', async ()=>{
        const token = await generateJWT({role: 'ADMIN'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:13}).auth(token, {type:"bearer"});
        console.log(statusCode)
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),

        }))
    });
 }) */