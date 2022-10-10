const request = require('supertest');
const { app, server } = require('../server');
const generateJWT = require('../helpers/generateJWT');
const db = require('../api/database/models');

describe('POST api/v1/products', () => {
    test('GOD Debe crear un producto con los parametros que tiene el data', async () => {
        const token = await generateJWT({role: 'GOD'});

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
            title:"Producto test",
            price:5,
            mostwanted:0,
            stock:1,
            description:"Esto es una prueba",
            id_category:1
        }))
        await db.Product.destroy({where:{id : newDB.at(-1).id}});
    })

    test('ADMIN Debe crear un producto con los parametros que tiene el data', async () => {
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
            title:"Producto test",
            price:5,
            mostwanted:0,
            stock:1,
            description:"Esto es una prueba",
            id_category:1
        }))
        await db.Product.destroy({where:{id : newDB.at(-1).id}});
    })

    test('GUEST Debe saltar status 401 ya que el guest no tiene permisos para crear', async () => {
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

    test('Crear con un id_category inexistente, debe devolver status 400 sin crear el producto', async () => {
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

    test('Crear con un id_category tipo String, debe devolver status 400 sin crear el producto', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
            title: "Producto test",
            price: 5,
            mostwanted: 0,
            stock: 1,
            description: "Esto es una prueba",
            id_category: "Esto es una categoria"
        }
        let DB = db.Product.findAll();
        const { statusCode, body } = await request(app).post('/api/v1/products').send(data).auth(token, {type:"bearer"});
        const newDB = db.Product.findAll();

        expect(statusCode).toEqual(400);
        expect(DB.length).toEqual(newDB.length);
    })


    test('Crear sin indicar el title, debe devolver status 400 sin crear el producto', async () => {
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

    test('Crear con un title tipo Integer, debe devolver status 400 sin crear el producto', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
            title:10,
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

    test('Crear con un price tipo String, debe devolver status 400 sin crear el producto', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
            title: 'Producto test',
            price:"Esto es un precio",
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

    test('Crear con un stock tipo String, debe devolver status 400 sin crear el producto', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
            title: "Producto test",
            price: 5,
            mostwanted: 0,
            stock: "Esto es un stock",
            description: "Esto es una prueba",
            id_category: 1
        }
        let DB = db.Product.findAll();
        const { statusCode, body } = await request(app).post('/api/v1/products').send(data).auth(token, {type:"bearer"});
        const newDB = db.Product.findAll();

        expect(statusCode).toEqual(400);
        expect(DB.length).toEqual(newDB.length);
    })


    test('Crear un producto sin tener el token, debe devolver statusCode 403', async () => {
        const data = {
            title: 'Producto test',
            price:10,
            mostwanted: 0,
            stock: 1,
            description: "Esto es una prueba",
            id_category: 1
        }
        let DB = db.Product.findAll();
        const { statusCode, body } = await request(app).post('/api/v1/products').send(data)
        const newDB = db.Product.findAll();

        expect(statusCode).toEqual(403);
        expect(DB.length).toEqual(newDB.length);
    })

})

describe('GET api/v1/products', () => {

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

    test('Listar productos sin token, debe devolver statusCode 403', async () => {

        const { statusCode, body } = await request(app).get('/api/v1/products')
        expect(statusCode).toEqual(403);
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

    test('Busqueda por mostwanted sin token, debe devolver statusCode 403', async () => {

        const { statusCode, body } = await request(app).get('/api/v1/products/mostwanted')
        expect(statusCode).toEqual(403);
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

    test('GOD con una categoria con caracteres especiales, Debe devolver 404 not found', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "4#!*😀"}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
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

    test('Buscar por query sin tener token, debe devolver statusCode 403', async () => {

        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "e"})

        expect(statusCode).toEqual(403);
    })
})

