const request = require('supertest');
const { app, server } = require('../server');
const generateJWT = require('../helpers/generateJWT');
const db = require('../api/database/models');


afterEach(() => {
    server.close();
 });

describe('GET Carts', () => {

    test('GOD puede ver cualquier carrito', async () => {
        const token = await generateJWT({role: 'GOD'});

        const DB = await db.Product.findAll();
        const { statusCode, body } = await request(app).post('/api/v1/products').send(data).auth(token, {type:"bearer"});
        const newDB = await db.Product.findAll();
        const productoCreado = newDB.at(-1);

        expect(statusCode).toEqual(200);
        expect(DB.length + 1).toEqual(newDB.length);
        expect(productoCreado).toEqual(expect.objectContaining({
            title:expect.any(String),
            price:expect.any(Number),
            mostwanted:expect.any(Number),
            stock:expect.any(Number),
            description:expect.any(String),
            id_category:expect.any(Number)
        }))
        await db.Product.destroy({where:{id : newDB.at(-1).id}});
    })

    test('ADMIN puede ver cualquier carrito', async () => {
        const token = await generateJWT({role: 'ADMIN'});

        const data = {
            title: "Producto test",
            price: 5,
            mostwanted: 0,
            stock: 1,
            description: "Esto es una prueba",
            id_category: 1
        }
        const DB = await db.Product.findAll();
        const { statusCode, body } = await request(app).post('/api/v1/products').send(data).auth(token, {type:"bearer"});
        const newDB = await db.Product.findAll();
        const productoCreado = newDB.at(-1);

        expect(statusCode).toEqual(200);
        expect(DB.length + 1).toEqual(newDB.length);
        expect(productoCreado).toEqual(expect.objectContaining({
            title:expect.any(String),
            price:expect.any(Number),
            mostwanted:expect.any(Number),
            stock:expect.any(Number),
            description:expect.any(String),
            id_category:expect.any(Number)
        }))
        await db.Product.destroy({where:{id : newDB.at(-1).id}});
    })

    test('GUEST puede ver su carrito', async () => {
        const token = await generateJWT({role: 'GUEST'});
        const data = {
            title: "Producto test",
            price: 5,
            mostwanted: 0,
            stock: 1,
            description: "Esto es una prueba",
            id_category: 1
        }
        let DB = db.Product.findAll();
        const { statusCode, body } = await request(app).post('/api/v1/products').send(data).auth(token, {type:"bearer"});
        const newDB = db.Product.findAll();

        expect(statusCode).toEqual(403);
        expect(DB.length).toEqual(newDB.length);
    })

    test('GUEST no puede ver un carrito ageno', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
            title: "Producto test",
            price: 5,
            mostwanted: 0,
            stock: 1,
            description: "Esto es una prueba",
            id_category: 10000
        }
        let DB = db.Product.findAll();
        const { statusCode, body } = await request(app).post('/api/v1/products').send(data).auth(token, {type:"bearer"});
        const newDB = db.Product.findAll();

        expect(statusCode).toEqual(400);
        expect(DB.length).toEqual(newDB.length);
    })

    test('Hay que estar autenticado para ver carritos', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
            price: 5,
            mostwanted: 0,
            stock: 1,
            description: "Esto es una prueba",
            id_category: 1
        }
        let DB = db.Product.findAll();
        const { statusCode, body } = await request(app).post('/api/v1/products').send(data).auth(token, {type:"bearer"});
        const newDB = db.Product.findAll();

        expect(statusCode).toEqual(400);
        expect(DB.length).toEqual(newDB.length);
    })

    test('Crear sin indicar el price, debe devolver status 400 sin crear el producto', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
            title: 'Producto test',
            mostwanted: 0,
            stock: 1,
            description: "Esto es una prueba",
            id_category: 1
        }
        let DB = db.Product.findAll();
        const { statusCode, body } = await request(app).post('/api/v1/products').send(data).auth(token, {type:"bearer"});
        const newDB = db.Product.findAll();

        expect(statusCode).toEqual(400);
        expect(DB.length).toEqual(newDB.length);
    })


})

describe('PUT Carts', () => {

    test('GOD Debe devolver la lista de productos', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            lista:expect.arrayContaining([
                expect.objectContaining({
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                    id_category:expect.any(Number)
                })
            ])
        }))
    })

    test('ADMIN Debe devolver la lista de productos', async () => {
        const token = await generateJWT({role: 'ADMIN'});
        const { statusCode, body } = await request(app).get('/api/v1/products').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            lista:expect.arrayContaining([
                expect.objectContaining({
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                    id_category:expect.any(Number)
                })
            ])
        }))
    })

    test('GUEST Debe devolver la lista de productos', async () => {
        const token = await generateJWT({role: 'GUEST'});
        const { statusCode, body } = await request(app).get('/api/v1/products').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            lista:expect.arrayContaining([
                expect.objectContaining({
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                    id_category:expect.any(Number)
                })
            ])
        }))
    })


})

describe('GET api/v1/products/mostwanted', () => {
    test('GOD Debe devolver la lista de productos con mostwanted en 1', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products/mostwanted').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:1,
                    stock:expect.any(Number),
                    description:expect.any(String),
                    id_category:expect.any(Number)
                })
            ])
        }))
    })

    test('ADMIN Debe devolver la lista de productos con mostwanted en 1', async () => {
        const token = await generateJWT({role: 'ADMIN'});
        const { statusCode, body } = await request(app).get('/api/v1/products/mostwanted').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:1,
                    stock:expect.any(Number),
                    description:expect.any(String),
                    id_category:expect.any(Number)
                })
            ])
        }))
    })

    test('GUEST Debe devolver la lista de productos con mostwanted en 1', async () => {
        const token = await generateJWT({role: 'GUEST'});
        const { statusCode, body } = await request(app).get('/api/v1/products/mostwanted').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    title:expect.any(String),
                    price:expect.any(Number),
                    mostwanted:1,
                    stock:expect.any(Number),
                    description:expect.any(String),
                    id_category:expect.any(Number)
                })
            ])
        }))
    })
})

describe('GET api/v1/products/?category', () => {
    test('GOD Debe devolver la lista de productos que contengan el query en su categoria', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "e"}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado:expect.arrayContaining([
                expect.objectContaining({
                    title:expect.any(String),
                    price:expect.any(Number),
                    id_category:expect.any(Number),
                    productocategoria:expect.objectContaining({
                        name:expect.stringMatching(/E/i)
                    })
                })
            ])
        }))
    })

    test('GOD Debe devolver 404 not found', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "zzz"}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }))
    })

    test('GOD Debe devolver la lista de productos con el query en la categoria', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "AlFa"}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado:expect.arrayContaining([
                expect.objectContaining({
                    title:expect.any(String),
                    price:expect.any(Number),
                    id_category:expect.any(Number),
                    productocategoria:expect.objectContaining({
                        name:expect.stringMatching(/AlFa/i)
                    })
                })
            ])
        }))
    })

    test('ADMIN Debe devolver la lista de productos con el query en la categoria', async () => {
        const token = await generateJWT({role: 'ADMIN'});
        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "e"}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado:expect.arrayContaining([
                expect.objectContaining({
                    title:expect.any(String),
                    price:expect.any(Number),
                    id_category:expect.any(Number),
                    productocategoria:expect.objectContaining({
                        name:expect.stringMatching(/E/i)
                    })
                })
            ])
        }))
    })

    test('GUEST Debe devolver la lista de productos con el query en la categoria', async () => {
        const token = await generateJWT({role: 'GUEST'});
        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "e"}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado:expect.arrayContaining([
                expect.objectContaining({
                    title:expect.any(String),
                    price:expect.any(Number),
                    id_category:expect.any(Number),
                    productocategoria:expect.objectContaining({
                        name:expect.stringMatching(/E/i)
                    })
                })
            ])
        }))
    })

})