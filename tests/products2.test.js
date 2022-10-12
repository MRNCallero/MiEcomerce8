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
    const categoria4 = {
        id:4,
        name:"Verdura"
    }
    const categoria5 = {
        id:5,
        name:"Congelados"
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
        title: "Oreo",
        price: 30,
        id_category: 2,
        description: "Galletita negra y blanca",
        stock: 5
    }
    const producto4 = {
        id: 4,
        title: "Papas",
        price: 150,
        mostwanted: true,
        stock: 50,
        description: "Verdura que perdura",
        id_category: 4
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
    await db.Categoria.create(categoria4);
    await db.Categoria.create(categoria5);


    //Productos
    await db.Product.create(producto1);
    await db.Product.create(producto2);
    await db.Product.create(producto3);
    await db.Product.create(producto4);


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



describe('GET api/v1/products', () => {

    test('Retorna uno de los productos - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   


        const {body, statusCode} = await request(app).get(`/api/v1/products/1`).send({id:2}).auth(tokenGod, {type:"bearer"});
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

    test('Retorna uno de los productos - Usuario ADMIN', async () => {

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

    test('Retorna msg error para producto no existente  - Usuario ADMIN', async () => {
        const tokenAdmin = await generateJWT({role: 'ADMIN'});   
        const {body, statusCode} = await request(app).get("/api/v1/products/189").send({id:189}).auth(tokenAdmin, {type:"bearer"});  
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))
    });

    test('Retorna uno de los productos - Usuario Guest', async () => {

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

    test('Retorna msg error para producto no existente  - Usuario GUEST', async () => {
        const tokenGuest = await generateJWT({role: 'GUEST'});   
        const {body, statusCode} = await request(app).get("/api/v1/products/189").send({id:189}).auth(tokenGuest, {type:"bearer"});  
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))
    });

    test('Usuario no logueado intenta ver listado productos- Usuario NO LOGUEADO', async () => {
        const tokenGuest = "pedro";
        const {body, statusCode} = await request(app).get("/api/v1/products/1").send({id:1}).auth(tokenGuest, {type:"bearer"});  
        expect(statusCode).toBe(401);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))
    });


});


describe('PUT api/v1/products/:id', () => {

    test('Edicion de productos - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const producto5 = {
            title : "Papas rusticas",
            price: 190,
            mostwanted: false,
            stock: 80,
            description: "Tuberculo",
            id_category: 5
        }

        const {body, statusCode} = await request(app).put(`/api/v1/products/4`).send(producto5).auth(tokenGod, {type:"bearer"});


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
                    id_category: 5
                })
        }))

    });

    test('Edicion de productos con categoria NO existente- Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const producto5 = {
            title : "Papas rusticas",
            price: 190,
            mostwanted: false,
            stock: 80,
            description: "Tuberculo",
            id_category: 867
        }

        const {body, statusCode} = await request(app).put(`/api/v1/products/4`).send(producto5).auth(tokenGod, {type:"bearer"});


        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
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

        const producto5 = {
            title : "Papas rusticas",
            price: 190,
            mostwanted: false,
            stock: 80,
            description: "Tuberculo",
            id_category: 5
        }

        const {body, statusCode} = await request(app).put(`/api/v1/products/${4}`).send(producto5).auth(tokenAdmin, {type:"bearer"});

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
                    id_category: 5
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

        const producto5 = {
            title : "Papas rusticas",
            price: 190,
            mostwanted: false,
            stock: 80,
            description: "Tuberculo",
            id_category: 5
        }

        const {body, statusCode} = await request(app).put(`/api/v1/products/4`).send(producto5).auth(tokenGuest, {type:"bearer"});
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

    test('Usuario no logueado intenta editar producto - Usuario NO LOGUEADO', async () => {
        const tokenGuest = "pedro";
        const {body, statusCode} = await request(app).put("/api/v1/products/1").send({id:1}).auth(tokenGuest, {type:"bearer"});  
        expect(statusCode).toBe(401);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
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

    /*afterEach(async () =>{
        await db.Categoria.destroy({where:{name:"Verdura"}});
        await db.Product.destroy({where:{title:"Papas"}});
    })*/

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

    test('Borrado de productos - No puede acceder - Usuario GUEST', async () => {

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

    test('Usuario no logueado intenta borrar producto - Usuario NO LOGUEADO', async () => {
        const tokenGuest = "pedro";
        const {body, statusCode} = await request(app).delete("/api/v1/products/1").send({id:1}).auth(tokenGuest, {type:"bearer"});  
        expect(statusCode).toBe(401);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))
    });

});



describe('GET api/v1/products/search', () => {
    let catAgregada;
    let agregado;
    

    /*beforeAll(async ()  =>{
        catAgregada = await db.Categoria.create({name : "Verdura"});

        agregado = await db.Product.create({
            title: "Papas",
            price: 150,
            mostwanted: true,
            stock: 50,
            description: "Verdura que perdura",
            id_category: catAgregada.id
        });
    });*/

    test('Busqueda de productos por KeyWord DESCRIPTION- Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   
        const {body, statusCode} = await request(app).get('/api/v1/products/search').query({q:"lan"}).auth(tokenGod, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado: expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    title:expect.any(String),
                    description: expect.stringMatching(/lan/i),
                    id_category: expect.any(Number)
                })
            ])
        }))
    });

    test('Busqueda de productos por KeyWord TITLE- Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   
        const {body, statusCode} = await request(app).get('/api/v1/products/search').query({q:"ore"}).auth(tokenGod, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado: expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                    title: expect.stringMatching(/ore/i),
                    id_category: expect.any(Number)
                })
            ])
        }))
    });

    test('Retorna msg error para busqueda de producto - Usuario GOD', async () => {

        const tokenGod = await generateJWT({role: 'GOD'});   

        const {body, statusCode} = await request(app).get("/api/v1/search").query({q:"xsdfsdf"}).auth(tokenGod, {type:"bearer"});
       
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))

    });

    test('Busqueda de productos por KeyWord DESCRIPTION- Usuario ADMIN', async () => {

        const tokenGod = await generateJWT({role: 'ADMIN'});   
        const {body, statusCode} = await request(app).get('/api/v1/products/search').query({q:"lan"}).auth(tokenGod, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado: expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    title:expect.any(String),
                    description: expect.stringMatching(/lan/i),
                    id_category: expect.any(Number)
                })
            ])
        }))
    });

    test('Busqueda de productos por KeyWord TITLE- Usuario ADMIN', async () => {

        const tokenGod = await generateJWT({role: 'ADMIN'});   
        const {body, statusCode} = await request(app).get('/api/v1/products/search').query({q:"ore"}).auth(tokenGod, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado: expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                    title: expect.stringMatching(/ore/i),
                    id_category: expect.any(Number)
                })
            ])
        }))
    });

    test('Retorna msg error para busqueda de producto - Usuario ADMIN', async () => {

        const tokenGod = await generateJWT({role: 'ADMIN'});   

        const {body, statusCode} = await request(app).get("/api/v1/search").query({q:"xsdfsdf"}).auth(tokenGod, {type:"bearer"});
       
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))

    });

    test('Busqueda de productos por KeyWord DESCRIPTION- Usuario GUEST', async () => {

        const tokenGod = await generateJWT({role: 'GUEST'});   
        const {body, statusCode} = await request(app).get('/api/v1/products/search').query({q:"lan"}).auth(tokenGod, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado: expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    title:expect.any(String),
                    description: expect.stringMatching(/lan/i),
                    id_category: expect.any(Number)
                })
            ])
        }))
    });

    test('Busqueda de productos por KeyWord TITLE- Usuario GUEST', async () => {

        const tokenGod = await generateJWT({role: 'GUEST'});   
        const {body, statusCode} = await request(app).get('/api/v1/products/search').query({q:"ore"}).auth(tokenGod, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            listado: expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    price:expect.any(Number),
                    mostwanted:expect.any(Number),
                    stock:expect.any(Number),
                    description:expect.any(String),
                    title: expect.stringMatching(/ore/i),
                    id_category: expect.any(Number)
                })
            ])
        }))
    });

    test('Retorna msg error para busqueda de producto - Usuario GUEST', async () => {

        const tokenGod = await generateJWT({role: 'GUEST'});   
        const {body, statusCode} = await request(app).get("/api/v1/products/search").query({q:"67547464"}).auth(tokenGod, {type:"bearer"});
       
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))

    });

    test('Usuario no logueado intenta buscar producto - Usuario NO LOGUEADO', async () => {
        const tokenGuest = "pedro";
        const {body, statusCode} = await request(app).get("/api/v1/products/search").query({q:"xsdfsdf"});
        expect(statusCode).toBe(401);
        expect(body).toEqual(expect.objectContaining({
            ok : expect.any(Boolean),
            msg : expect.any(String),
        }))
    });


});