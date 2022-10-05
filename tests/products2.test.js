const request = require('supertest');
const { app, server } = require('../server');
const generateJWT = require('../helpers/generateJWT');
const db = require('../api/database/models');

afterEach(()=>{
    db.Product.destroy({
        where: {},
        truncate: true
    });
    db.Categoria.destroy({
        where: {},
        truncate: true
    });
})
describe('GET api/v1/products', () => {

    test('Retorna el listado de los productos - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const catAgregada = await db.Categoria.create({name : "Verdura"});

        const agregado = await db.Products.create({
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
            msj:expect.any(String),
            producto:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String)
                })
            ])
        }))

    });

    test('Retorna msg error para producto no existente - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const {body, statusCode} = await request(app).get("/api/v1/products/189").send({id:189}).auth(tokenGod, {type:"bearer"});   
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msj : expect.any(String),
        }))

    });

    test('Retorna el listado de los productos - Usuario ADMIN', async () => {

        const tokenAdmin = await generateJWT({role: 'ADMIN'});   

        const catAgregada = await db.Categoria.create({name : "Verdura"});

        const agregado = await db.Products.create({
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
            msj:expect.any(String),
            producto:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                    id_category : expect.any(Number)
                })
            ])
        }))

    });

    test('Retorna el listado de los productos - Usuario ADMIN', async () => {
        const tokenAdmin = await generateJWT({role: 'ADMIN'});   
        const {body, statusCode} = await request(app).get("/api/v1/products/189").send({id:189}).auth(tokenAdmin, {type:"bearer"});  
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msj : expect.any(String),
        }))
    });

    test('Retorna el listado de los productos - Usuario Guest', async () => {

        const tokenGuest = await generateJWT({role: 'GUEST'});   

        const catAgregada = await db.Categoria.create({name : "Verdura"});

        const agregado = await db.Products.create({
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
            msj:expect.any(String),
            producto:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                    id_category : expect.any(Number)
                })
            ])
        }))

    });

    test('Retorna el listado de los productos - Usuario GUEST', async () => {
        const tokenGuest = await generateJWT({role: 'GUEST'});   
        const {body, statusCode} = await request(app).get("/api/v1/products/189").send({id:189}).auth(tokenGuest, {type:"bearer"});  
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msj : expect.any(String),
        }))
    });

});


describe('PUT api/v1/products/:id', () => {

    test('Edicion de productos - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const catAgregada = await db.Categoria.create({name : "Verdura"});

        const agregado = await db.Products.create({
            title: "Papas",
            price: 150,
            mostwanted: true,
            stock: 50,
            description: "Verdura que perdura",
            id_category: catAgregada.id
        });

        const catSegunda = await db.Categoria.create({name: "Congelados"});

        const modAgregado = {
            title : "Papas rusticas",
            price: 190,
            mostwanted: false,
            stock: 80,
            description: "Tuberculo",
            category: catSegunda.id
        };

        const {body, statusCode} = await request(app).put(`/api/v1/products/${agregado.id}`).send(modAgregado).auth(tokenGod, {type:"bearer"});
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),
            producto:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    title:'Papas rusticas',
                    price:190,
                    mostwanted:expect.any(Number),
                    stock:80,
                    description: 'Tuberculo',
                    id_category: catSegunda.id
                })
            ])
        }))

    });

    test('Retorna msg error para edicion de producto no existente - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const {body, statusCode} = await request(app).put("/api/v1/products/189").send({id:189}).auth(tokenGod, {type:"bearer"});
       
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msj : expect.any(String),
        }))

    });

    test('Edicion de productos  - Usuario ADMIN', async () => {

        const tokenAdmin = await generateJWT({role: 'ADMIN'});   

        const catAgregada = await db.Categoria.create({name : "Verdura"});

        const agregado = await db.Products.create({
            title: "Papas",
            price: 150,
            mostwanted: true,
            stock: 50,
            description: "Verdura que perdura",
            id_category: catAgregada.id
        });

        const catSegunda = await db.Categoria.create({name: "Congelados"});

        const modAgregado = {
            title : "Papas rusticas",
            price: 190,
            mostwanted: false,
            stock: 80,
            description: "Tuberculo",
            category: catSegunda.id
        };

        const {body, statusCode} = await request(app).put(`/api/v1/products/${agregado.id}`).send(modAgregado).auth(tokenAdmin, {type:"bearer"});
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msj:expect.any(String),
            producto:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    title:'Papas rusticas',
                    price:190,
                    mostwanted:expect.any(Number),
                    stock:80,
                    description: 'Tuberculo',
                    id_category: catSegunda.id
                })
            ])
        }))

    });

    test('Retorna msg error para edicion de producto no existente - Usuario ADMIN', async () => {
        const tokenAdmin = await generateJWT({role: 'ADMIN'});   
        const {body, statusCode} = await request(app).put("/api/v1/products/189").send({id:189}).auth(tokenAdmin, {type:"bearer"});  
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msj : expect.any(String),
        }))
    });

    test('Edicion de productos - No puede acceder - Usuario Guest', async () => {

        const tokenGuest = await generateJWT({role: 'GUEST'});   

        const catAgregada = await db.Categoria.create({name : "Verdura"});

        const agregado = await db.Products.create({
            title: "Papas",
            price: 150,
            mostwanted: true,
            stock: 50,
            description: "Verdura que perdura",
            id_category: catAgregada.id
        });

        const catSegunda = await db.Categoria.create({name: "Congelados"});

        const modAgregado = {
            title : "Papas rusticas",
            price: 190,
            mostwanted: false,
            stock: 80,
            description: "Tuberculo",
            category: catSegunda.id
        };

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