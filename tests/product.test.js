const request = require('supertest');
const { app, server } = require('../server');
const generateJWT = require('../helpers/generateJWT');
const db = require('../api/database/models');
beforeEach( async() => {

    const categoria1 = {
        id:1,
        name:"Bebida"
    }
    const categoria2 = {
        id:2,
        name:"Alfajores"
    }
    const categoria3 = {
        id:3,
        name:"Galletas"
    }

    const cart = {
        id_user:1,
        id_product:1,
        date:"2022-10-3",
        quantity:3
    }
    const cart1 = {
        id_user:1,
        id_product:2,
        date:"2022-9-3",
        quantity:5
    }    
    const cart2 = {
        id_user:1,
        id_product:1,
        date:"2022-8-3",
        quantity:3
    }
    const user = {
        id:1,
        email:'god@god.com',
        username:'god',
        password:'god',
        first_name: 'Diosito',
        last_name:'TodoPoderoso',
        profilepic:'https://media.istockphoto.com/photos/hands-of-god-picture-id157377707?k=20&m=157377707&s=612x612&w=0&h=K-dH2tCJGpQONcmvauRMeVnm-r5QdL4NipRDokHXukI=', 
        role:'GOD'
    }
    const user2 = {
        id:2,
        email:'admin@admin.com',
        username:'Admin',
        password:'Admin',
        first_name: 'ElAdmin',
        last_name:'NoTanPoderoso',
        profilepic:'https://media.istockphoto.com/vectors/administrative-professionals-day-secretaries-day-or-admin-day-holiday-vector-id1204416887?k=20&m=1204416887&s=612x612&w=0&h=tI6AmIGHRBv8NdL2KJHvHOtQ9nBhzAnX5yhmVNqrf-0=', 
        role:'ADMIN'
    }
    const user3 = {
        id:3,
        email:'guset@guest.com',
        username:'guest',
        password:'guest',
        first_name: 'guest',
        last_name:'guest',
        profilepic:'https://media.istockphoto.com/vectors/administrative-professionals-day-secretaries-day-or-admin-day-holiday-vector-id1204416887?k=20&m=1204416887&s=612x612&w=0&h=tI6AmIGHRBv8NdL2KJHvHOtQ9nBhzAnX5yhmVNqrf-0=', 
        role:'GUEST'
    }


    const producto1 = {
        id:1,
        title: "Marley",
        price: 30,
        mostwanted: 1,
        id_category: 2,
        description: "Extra dulce de leche",
        stock: 5
    }
    const producto2 = {
        id:2,
        title: "Coca-Cola",
        price: 100,
        id_category: 1,
        description: "Sin Azucar",
        stock: 10
    }
    const producto3 = {
        id:3,
        title: "Marley",
        price: 30,
        id_category: 2,
        description: "Extra dulce de leche",
        stock: 5
    }
    const picture = {
        id:1,
        url:"https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/04/brad-west-kzloZDPHzeg-unsplash-scaled.jpg?w=2560&quality=60&strip=all&ssl=1",
        id_product:1
    }
    const picture1 = {
        id:2,
        url:"https://cdn.shopify.com/s/files/1/0374/1987/6483/products/marley-blanco_150x.jpg?v=1647453689",
        id_product:1
    }
    const picture2 = {
        id:3,
        url:"https://www.coca-coladeuruguay.com.uy/content/dam/journey/uy/es/private/brands/coca-cola/Large_product_shot_cocacolaoriginal.png",
        id_product:2
    }


    await db.Categoria.create(categoria1);
    await db.Categoria.create(categoria2);
    await db.Categoria.create(categoria3);

    //Productos
    await db.Product.create(producto1);
    await db.Product.create(producto2);
    await db.Product.create(producto3);

    //Picture
    await db.Picture.create(picture);
    await db.Picture.create(picture1);
    await db.Picture.create(picture2);

    //usuarios
    await db.Usuario.create(user);
    await db.Usuario.create(user2);
    await db.Usuario.create(user3);

    //cart
    await db.Cart.create(cart);
    await db.Cart.create(cart1);
    await db.Cart.create(cart2);


}); 
afterEach(async () => {
    await db.Cart.destroy({where:{}})
    await db.Usuario.destroy({where:{}})
    await db.Picture.destroy({where:{}})
    await db.Product.destroy({where:{}})
    await db.Categoria.destroy({where:{}})


});

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


    test('Crear un producto sin tener el token, debe devolver statusCode 401', async () => {
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

        expect(statusCode).toEqual(401);
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

    test('Listar productos sin token, debe devolver statusCode 401', async () => {

        const { statusCode, body } = await request(app).get('/api/v1/products')
        expect(statusCode).toEqual(401);
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

    test('Busqueda por mostwanted sin token, debe devolver statusCode 401', async () => {

        const { statusCode, body } = await request(app).get('/api/v1/products/mostwanted')
        expect(statusCode).toEqual(401);
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

    test('GOD con una categoria con caracteres especiales, Debe devolver 200 pero informando que la lista esta vacia', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "4#!*😀"}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }))
    })

    test('GOD Debe devolver un mensaje de que esta vacio', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "zzz"}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
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

    test('Buscar por query sin tener token, debe devolver statusCode 401', async () => {

        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "e"})

        expect(statusCode).toEqual(401);
    })
})

describe('GET En los metodos cuando la lista devuelta es vacia', () => {
    beforeEach(async () => {
        await db.Cart.destroy({where:{}})
        await db.Usuario.destroy({where:{}})
        await db.Picture.destroy({where:{}})
        await db.Product.destroy({where:{}})
        await db.Categoria.destroy({where:{}})
    
    
    });

    test('GOD Debe devolver la lista vacia para los mostwanted', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products/mostwanted').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:true,
            msg:"El listado esta vacio",
        }))
    })

    test('GOD Debe devolver la lista de productos vacia', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:true,
            msg: 'Listado de productos vacio'
        }))
    })

    test('GOD Debe devolver la lista de productos que contengan el query en su categoria', async () => {
        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products/').query({category: "e"}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:true,
            msg:'No se encontraron productos con esa categoria'
        }))
    })
})