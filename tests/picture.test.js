const request = require('supertest');
const { app, server } = require('../server');
const generateJWT = require('../helpers/generateJWT');
const db = require('../api/database/models');



afterEach(() => {
    server.close();
 });
 
 describe('GET pictures of product /api/v1/pictures', () => {

    test('Usuario GOD - RUTA /api/v1/pictures - Debe devolver una lista con todas las pictures de un producto', async ()=>{
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
    test('Usuario GOD - RUTA /api/v1/pictures - Se pasanda un id que no existe devolver un mensaje informando que no existe el producto', async ()=>{
        const token = await generateJWT({role: 'GOD'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:90000}).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),

        }))
    });
    test('Usuario GOD - RUTA /api/v1/pictures - Se pasanda un id de un producto que no tiene imagenes', async ()=>{
        const token = await generateJWT({role: 'GOD'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:13}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),

        }))
    });
    test('Usuario GOD - RUTA /api/v1/pictures - No se pasa un id debe devolver un array con el error', async ()=>{
        const token = await generateJWT({role: 'GOD'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({}).auth(token, {type:"bearer"});

        expect(body).toEqual(expect.objectContaining({
                errors:expect.arrayContaining([
                    expect.objectContaining({
                        msg:expect.any(String),
                        param:expect.any(String),
                        location:expect.any(String)
                })
            ])
        })
        )
    })
//-----------------------------------------------
    test('Usuario ADMIN - RUTA /api/v1/pictures - Debe devolver una lista con todas las pictures de un producto', async ()=>{
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
    test('Usuario ADMIN - RUTA /api/v1/pictures - Se pasanda un id que no existe devolver un mensaje informando que no existe el producto', async ()=>{
        const token = await generateJWT({role: 'ADMIN'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:90000}).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),

        }))
    });
    test('Usuario ADMIN - RUTA /api/v1/pictures - Se pasanda un id de un producto que no tiene imagenes', async ()=>{
        const token = await generateJWT({role: 'ADMIN'});
        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:13}).auth(token, {type:"bearer"});
        console.log(statusCode)
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),

        }))
    });
    test('Usuario ADMIN - RUTA /api/v1/pictures - No se pasa un id debe devolver un array con el error', async ()=>{
        const token = await generateJWT({role: 'ADMIN'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({}).auth(token, {type:"bearer"});

        expect(body).toEqual(expect.objectContaining({
                errors:expect.arrayContaining([
                    expect.objectContaining({
                        msg:expect.any(String),
                        param:expect.any(String),
                        location:expect.any(String)
                })
            ])
        })
        )
    })
//-----------------------------------------------
    test('Usuario GUEST - RUTA /api/v1/pictures - Debe devolver una lista con todas las pictures de un producto', async ()=>{
        const token = await generateJWT({role: 'GUEST'});

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
    test('Usuario GUEST - RUTA /api/v1/pictures - Se pasanda un id que no existe devolver un mensaje informando que no existe el producto', async ()=>{
        const token = await generateJWT({role: 'GUEST'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:90000}).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),

        }))
    });
    test('Usuario GUEST - RUTA /api/v1/pictures - Se pasanda un id de un producto que no tiene imagenes', async ()=>{
        const token = await generateJWT({role: 'GUEST'});
        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:13}).auth(token, {type:"bearer"});
        console.log(statusCode)
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),

        }))
    });
    test('Usuario GUEST - RUTA /api/v1/pictures - No se pasa un id debe devolver un array con el error', async ()=>{
        const token = await generateJWT({role: 'GUEST'});

        const {body} = await request(app).get("/api/v1/pictures").query({}).auth(token, {type:"bearer"});

        expect(body).toEqual(expect.objectContaining({
                errors:expect.arrayContaining([
                    expect.objectContaining({
                        msg:expect.any(String),
                        param:expect.any(String),
                        location:expect.any(String)
                })
            ])
        })
        )
    })
})
describe('GET picture /api/v1/pictures/id', () => {
    test('Usuario GOD - RUTA /api/v1/pictures/id - pasar id correcto', async ()=>{
        
        const token = await generateJWT({role: 'GOD'});
        
        const {body, statusCode} = await request(app).get("/api/v1/pictures/1").auth(token, {type:"bearer"});
        
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),
            lista:
            expect.objectContaining({
                id:expect.any(Number),
                url:expect.any(String),
                id_product:expect.any(Number)
            })
        }))
    })
    test('Usuario GOD - RUTA /api/v1/pictures/id - pasar id incorrecto', async ()=>{
        
        const token = await generateJWT({role: 'GOD'});
        
        const {body, statusCode} = await request(app).get("/api/v1/pictures/100").auth(token, {type:"bearer"});
        
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),
        }))
        //-----------------------------------------------
    })
    test('Usuario ADMIN - RUTA /api/v1/pictures/id - pasar id incorrecto', async ()=>{
        
        const token = await generateJWT({role: 'ADMIN'});
        
        const {body, statusCode} = await request(app).get("/api/v1/pictures/1").auth(token, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),
            lista:
                expect.objectContaining({
                    id:expect.any(Number),
                    url:expect.any(String),
                    id_product:expect.any(Number)
                })
        }))
    })
    test('Usuario ADMIN - RUTA /api/v1/pictures/id - pasar id correcto', async ()=>{
        
        const token = await generateJWT({role: 'ADMIN'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures/asdasd").auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),
        }))
    })
    //-----------------------------------------------
    test('Usuario GUEST - RUTA /api/v1/pictures/id - pasar id incorrecto', async ()=>{
        
        const token = await generateJWT({role: 'GUEST'});
        
        const {body, statusCode} = await request(app).get("/api/v1/pictures/1").auth(token, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),
            lista:
                expect.objectContaining({
                    id:expect.any(Number),
                    url:expect.any(String),
                    id_product:expect.any(Number)
                })
        }))
    })
    test('Usuario GUEST - RUTA /api/v1/pictures/id - pasar id correcto', async ()=>{
        
        const token = await generateJWT({role: 'GUEST'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures/asdasd").auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),
        }))
    })
  
})
describe('POST picture /api/v1/pictures', () => {
    test('Sin Usuario- RUTA /api/v1/pictures - Debe informar que no se tiene acceso', async () => {
        const data = {
            "url": "nuevaURL",
            "description":"una descripcion",
            "id_product": 1
         };
         const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data);
   
         expect(statusCode).toEqual(403);
         expect(body).toEqual(expect.objectContaining({
                mensaje:expect.any(String)
            })
        )

    });
    test('Usuario GOD - RUTA /api/v1/pictures - Debe crear una picture en la base de datos', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
           "url": "nuevaURL",
           "description":"una descripcion",
           "id_product": 1
        };
  
        const originalDB = await db.Picture.findAll();
        data.id = originalDB.at(-1).id + 1

        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});
  
        const newDB = await db.Picture.findAll();

        expect(newDB[newDB.length -1].dataValues).toEqual(data);
        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            ok:true,
            msj:expect.any(String),
            picture:expect.objectContaining({
                url:expect.any(String),
                id_product:expect.any(Number)
            })
        }))
    });
})