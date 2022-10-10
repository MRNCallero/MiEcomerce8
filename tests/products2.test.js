const request = require('supertest');
const { app, server } = require('../server');
const generateJWT = require('../helpers/generateJWT');
const db = require('../api/database/models');

afterEach(()=>{
    server.close();
})
describe('GET api/v1/products', () => {

    test('Retorna el listado de los productos - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const catAgregada = await db.Categoria.create({name : "Verdura"});

        const agregado = await db.Product.create({
            title: "Papas",
            price: 150,
            mostwanted: true,
            stock: 50,
            description: "Verdura que perdura",
            id_category: catAgregada.id
        });

        const {body, statusCode} = await request(app).get(`/api/v1/products/${agregado.id}`).send({id:2}).auth(tokenGod, {type:"bearer"});
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            producto:
                expect.objectContaining({
                    id_category:expect.any(Number),
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                })
        }))

    });

    test('Retorna msg error para producto no existente - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const {body, statusCode} = await request(app).get("/api/v1/products/189").send({id:189}).auth(tokenGod, {type:"bearer"});   
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))

    });

    test('Retorna el listado de los productos - Usuario ADMIN', async () => {

        const tokenAdmin = await generateJWT({role: 'ADMIN'});   

        const catAgregada = await db.Categoria.create({name : "Verdura"});

        const agregado = await db.Product.create({
            title: "Papas",
            price: 150,
            mostwanted: true,
            stock: 50,
            description: "Verdura que perdura",
            id_category: catAgregada.id
        });

        const {body, statusCode} = await request(app).get(`/api/v1/products/${agregado.id}`).send({id:2}).auth(tokenAdmin, {type:"bearer"});
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            producto:
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                    id_category : expect.any(Number)
                })
        }))

    });

    test('Retorna el listado de los productos - Usuario ADMIN', async () => {
        const tokenAdmin = await generateJWT({role: 'ADMIN'});   
        const {body, statusCode} = await request(app).get("/api/v1/products/189").send({id:189}).auth(tokenAdmin, {type:"bearer"});  
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))
    });

    test('Retorna el listado de los productos - Usuario Guest', async () => {

        const tokenGuest = await generateJWT({role: 'GUEST'});   

        const catAgregada = await db.Categoria.create({name : "Verdura"});

        const agregado = await db.Product.create({
            title: "Papas",
            price: 150,
            mostwanted: true,
            stock: 50,
            description: "Verdura que perdura",
            id_category: catAgregada.id
        });

        const {body, statusCode} = await request(app).get(`/api/v1/products/${agregado.id}`).send({id:2}).auth(tokenGuest, {type:"bearer"});
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            producto:
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                    id_category : expect.any(Number)
                })
        }))

    });

    test('Retorna el listado de los productos - Usuario GUEST', async () => {
        const tokenGuest = await generateJWT({role: 'GUEST'});   
        const {body, statusCode} = await request(app).get("/api/v1/products/189").send({id:189}).auth(tokenGuest, {type:"bearer"});  
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))
    });

});


describe('PUT api/v1/products/:id', () => {
    let catAgregada;
    let agregado;
    let catSegunda;
    let modAgregado;

    beforeAll(async ()  =>{
        catAgregada = await db.Categoria.create({name : "Verdura"});

        agregado = await db.Product.create({
            title: "Papas",
            price: 150,
            mostwanted: true,
            stock: 50,
            description: "Verdura que perdura",
            id_category: catAgregada.id
        });

        catSegunda = await db.Categoria.create({name: "Congelados"});

        modAgregado = {
            title : "Papas rusticas",
            price: 190,
            mostwanted: false,
            stock: 80,
            description: "Tuberculo",
            id_category: catSegunda.dataValues.id
        };
    });




    test('Edicion de productos - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const {body, statusCode} = await request(app).put(`/api/v1/products/${agregado.dataValues.id}`).send(modAgregado).auth(tokenGod, {type:"bearer"});


        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            producto:
                expect.objectContaining({
                    id:expect.any(Number),
                    title:'Papas rusticas',
                    price:190,
                    mostwanted:expect.any(Number),
                    stock:80,
                    description: 'Tuberculo',
                    id_category: catSegunda.dataValues.id
                })
        }))

    });

    test('Retorna msg error para edicion de producto no existente - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const {body, statusCode} = await request(app).put("/api/v1/products/189").send({id:189}).auth(tokenGod, {type:"bearer"});
       
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))

    });

    test('Edicion de productos  - Usuario ADMIN', async () => {

        const tokenAdmin = await generateJWT({role: 'ADMIN'});   

        const {body, statusCode} = await request(app).put(`/api/v1/products/${agregado.dataValues.id}`).send(modAgregado).auth(tokenAdmin, {type:"bearer"});


        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            producto:
                expect.objectContaining({
                    id:expect.any(Number),
                    title:'Papas rusticas',
                    price:190,
                    mostwanted:expect.any(Number),
                    stock:80,
                    description: 'Tuberculo',
                    id_category: catSegunda.dataValues.id
                })
        }))

    });

    test('Retorna msg error para edicion de producto no existente - Usuario ADMIN', async () => {
        const tokenAdmin = await generateJWT({role: 'ADMIN'});   
        const {body, statusCode} = await request(app).put("/api/v1/products/189").send({id:189}).auth(tokenAdmin, {type:"bearer"});  
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))
    });

    test('Edicion de productos - No puede acceder - Usuario Guest', async () => {

        const tokenGuest = await generateJWT({role: 'GUEST'});   

        const {body, statusCode} = await request(app).put(`/api/v1/products/${agregado.id}`).send(modAgregado).auth(tokenGuest, {type:"bearer"});
        expect(statusCode).toBe(403);
        expect(body).toEqual(expect.objectContaining({
            error : expect.any(String)
        }))

    });

    test('Retorna msg error para edicion de producto no existente - No puede acceder - Usuario GUEST', async () => {
        const tokenGuest = await generateJWT({role: 'GUEST'});   
        const {body, statusCode} = await request(app).put("/api/v1/products/189").send({id:189}).auth(tokenGuest, {type:"bearer"});  
        expect(statusCode).toBe(403);
        expect(body).toEqual(expect.objectContaining({
            error : expect.any(String)
        }))
    });

});


describe('DELETE api/v1/products/:id', () => {
    let catAgregada;
    let agregado;

    beforeEach(async ()  =>{
        catAgregada = await db.Categoria.create({name : "Verdura"});

        agregado = await db.Product.create({
            title: "Papas",
            price: 150,
            mostwanted: true,
            stock: 50,
            description: "Verdura que perdura",
            id_category: catAgregada.id
        });
    });


    test('Borrado de productos - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const {body, statusCode} = await request(app).delete(`/api/v1/products/${agregado.dataValues.id}`).auth(tokenGod, {type:"bearer"});


        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            producto:
                expect.objectContaining({
                    id:agregado.dataValues.id,
                    title:'Papas',
                    price:150,
                    mostwanted:expect.any(Number),
                    stock:50,
                    description: 'Verdura que perdura',
                    id_category: catAgregada.dataValues.id
                })
        }))

    });

    test('Retorna msg error para borrado de producto no existente - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const {body, statusCode} = await request(app).delete("/api/v1/products/189").auth(tokenGod, {type:"bearer"});
       
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))

    });

    test('Retorna msg error para borrado de producto incluido en un carrito - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        await db.Cart.create({
            id_user: 1,
            id_product: agregado.dataValues.id,
            date:"2022-10-12",
            quantity: 10
        });

        const {body, statusCode} = await request(app).delete(`/api/v1/products/${agregado.dataValues.id}`).auth(tokenGod, {type:"bearer"});
       
        await db.Cart.destroy({where:{id_product:agregado.dataValues.id}});

        expect(statusCode).toBe(403);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String)
        }))

    });

    test('Retorna msg error para envío de string - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const {body, statusCode} = await request(app).delete("/api/v1/products/papas").auth(tokenGod, {type:"bearer"});
       
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))

    });

    test('Borrado de productos  - Usuario ADMIN', async () => {

        const tokenAdmin = await generateJWT({role: 'ADMIN'});   

        const {body, statusCode} = await request(app).delete(`/api/v1/products/${agregado.dataValues.id}`).auth(tokenAdmin, {type:"bearer"});


        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            producto:
                expect.objectContaining({
                    id:agregado.dataValues.id,
                    title:'Papas',
                    price:150,
                    mostwanted:expect.any(Number),
                    stock:50,
                    description: 'Verdura que perdura',
                    id_category: catAgregada.dataValues.id
                })
        }))

    });

    test('Retorna msg error para borrado de producto no existente - Usuario ADMIN', async () => {
        const tokenAdmin = await generateJWT({role: 'ADMIN'});   
        const {body, statusCode} = await request(app).delete("/api/v1/products/189").auth(tokenAdmin, {type:"bearer"});  
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))
    });

    test('Retorna msg error para borrado de producto incluido en un carrito - Usuario ADMIN', async () => {

        const tokenAdmin = await generateJWT({role: 'ADMIN'});   

        await db.Cart.create({
            id_user: 1,
            id_product: agregado.dataValues.id,
            date:"2022-10-12",
            quantity: 10
        });

        const {body, statusCode} = await request(app).delete(`/api/v1/products/${agregado.dataValues.id}`).auth(tokenAdmin, {type:"bearer"});
       
        await db.Cart.destroy({where:{id_product:agregado.dataValues.id}});

        expect(statusCode).toBe(403);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String)
        }))

    });

    test('Retorna msg error para envío de string - Usuario ADMIN', async () => {

        const tokenAdmin = await generateJWT({role: 'ADMIN'});   

        const {body, statusCode} = await request(app).delete("/api/v1/products/papas").auth(tokenAdmin, {type:"bearer"});
       
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))

    });

    test('Borrado de productos - No puede acceder - Usuario Guest', async () => {

        const tokenGuest = await generateJWT({role: 'GUEST'});   

        const {body, statusCode} = await request(app).put(`/api/v1/products/${agregado.id}`).auth(tokenGuest, {type:"bearer"});
        expect(statusCode).toBe(403);
        expect(body).toEqual(expect.objectContaining({
            error : expect.any(String)
        }))

    });

    test('Retorna msg error para borrado de producto no existente - No puede acceder - Usuario GUEST', async () => {
        const tokenGuest = await generateJWT({role: 'GUEST'});   
        const {body, statusCode} = await request(app).put("/api/v1/products/189").auth(tokenGuest, {type:"bearer"});  
        expect(statusCode).toBe(403);
        expect(body).toEqual(expect.objectContaining({
            error : expect.any(String)
        }))
    });

    test('Retorna msg error para borrado de producto incluido en un carrito - Usuario GUEST', async () => {

        const tokenGuest = await generateJWT({role: 'GUEST'});   

        const {body, statusCode} = await request(app).delete(`/api/v1/products/${agregado.dataValues.id}`).auth(tokenGuest, {type:"bearer"});
        expect(statusCode).toBe(403);
        expect(body).toEqual(expect.objectContaining({
            error : expect.any(String)
        }))

    });

    test('Retorna msg error para envío de string - Usuario GUEST', async () => {

        const tokenGuest = await generateJWT({role: 'GUEST'});   

        const {body, statusCode} = await request(app).delete("/api/v1/products/papas").auth(tokenGuest, {type:"bearer"});
       
        expect(statusCode).toBe(403);
        expect(body).toEqual(expect.objectContaining({
            error : expect.any(String)
        }))

    });

});