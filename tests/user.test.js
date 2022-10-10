const request = require('supertest');
const {app, server} = require ('../server');
const db = require ('../api/database/models');
const generateToken = require('../helpers/generateJWT');

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
        email:'guest@guest.com',
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

    ///Categoria

    await db.Categoria.create(categoria1);
    await db.Categoria.create(categoria2);
    await db.Categoria.create(categoria3);

    //Productos
    await db.Product.create(producto1)
    await db.Product.create(producto2)
    await db.Product.create(producto3)
    //Picture
    await db.Picture.create(picture)
    await db.Picture.create(picture1)
    await db.Picture.create(picture2)
    //usuarios
    await db.Usuario.create(user)
    await db.Usuario.create(user2)
    await db.Usuario.create(user3)
    //cart
    await db.Cart.create(cart)
    await db.Cart.create(cart1)
    await db.Cart.create(cart2)


});  
afterEach(async () => {
    await db.Cart.destroy({where:{}})
    await db.Usuario.destroy({where:{}})
    await db.Picture.destroy({where:{}})
    await db.Product.destroy({where:{}})

});
describe('POST /',() => {
    test('Debe devolver un código de estado 201, ok : true, msg : Usuario creado y el usuario creado ', async () => {
        const data = {
            "email":"guest2@guest.com",
            "username":"guest2",
            "password":"guest2",
            "firstname":"guest2",
            "lastname":"guest2"
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
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String)
                })
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
    test('GUEST: Debe devolver un código de estado 200 ok:true, msg: Lista de usuarios y la lista de usuarios', async () => {
        const token = await generateToken({role:"GUEST"});
        const { statusCode, body } = await request(app).get('/api/v1/users').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            users:expect.arrayContaining([expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })])
        }));
    });
    test('ADMIN: Debe devolver un código de estado 200 ok:true, msg: Lista de usuarios y la lista de usuarios', async () => {
        const token = await generateToken({role:"ADMIN"});
        const { statusCode, body } = await request(app).get('/api/v1/users').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            users:expect.arrayContaining([expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })])
        }));
    });
    test('GOD: Debe devolver un código de estado 200 ok:true, msg: Lista de usuarios y la lista de usuarios', async () => {
        const token = await generateToken({role:"GOD"});
        const { statusCode, body } = await request(app).get('/api/v1/users').auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            users:expect.arrayContaining([expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })])
        }));
    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro lista de usuarios', async () => {
      
    });
});
describe('GET /:id',() => {
    test('Debe devolver un código de estado 200 ok:true, msg: Usuarios id y el usuario buscado', async () => {
        const token = await generateToken({role:"GOD"});
        let i = 2;
        const { statusCode, body } = await request(app).get('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            user:expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })
        }));
    });
    test('Debe devolver un código de estado 200 ok:true, msg: Usuarios id y el usuario buscado', async () => {
        const token = await generateToken({id:3,role:"GUEST"});
        let i = 3;
        const { statusCode, body } = await request(app).get('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            user:expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })
        }));
    });
    test('Debe devolver un código de estado 200 ok:true, msg: Usuarios id y el usuario buscado', async () => {
        const token = await generateToken({role:"ADMIN"});
        let i = 2;
        const { statusCode, body } = await request(app).get('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            user:expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String),
                    role: expect.any(String)
                })
        }));
    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro usuario',  async () => {
        const token = await generateToken({role:"GOD"});
        let i = 200;
        const { statusCode, body } = await request(app).get('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String)   
        }));
    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro usuario', async () => {
        const token = await generateToken({role:"ADMIN"});
        let i = 200;
        const { statusCode, body } = await request(app).get('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String)   
        }));
    });  
});
describe('PUT /:id', () => {
    test('GOD Debe devolver un código de estado 200 ok:true, msg: Usuario modificado correctamente y el usuario modificado', async () => {
        const token = await generateToken({role:"GOD"});
        const data = {
            "email":"comun@guest.com",
            "username":"comun",
            "password":"guest",
            "firstname":"guest",
            "lastname":"guest"
        }
        let i = 3;
        const { statusCode, body } = await request(app).put('/api/v1/users/'+i).send(data).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            user:expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String)
                })
        }));
    });
    test('GUEST Debe devolver un código de estado 200 ok:true, msg: Usuario modificado correctamente y el usuario modificado', async () => {
        const token = await generateToken({id:3,role:"GUEST"});
        const data = {
            "email":"comun@guest.com",
            "username":"guest",
            "password":"guest",
            "firstname":"guest",
            "lastname":"guest",
            "role": "GUEST"
        }
        let i = 3;
        const { statusCode, body } = await request(app).post('/api/v1/users/'+i).send(data).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
            user:expect.objectContaining({
                    id: expect.any(Number),
                    email: expect.any(String),
                    username: expect.any(String),
                    first_name: expect.any(String),
                    last_name: expect.any(String),
                    profilepic: expect.any(String)
                })
        }));
    });
    test('Debe devolver un código de estado 404, ok : false, msg : Usuario no encontrado', async () => {
        const token = await generateToken({role:"GOD"});
        const data = {
            "email":"guest2@guest2.com",
            "username":"guest2",
            "password":"guest2",
            "firstname":"guest2",
            "lastname":"guest2"
        }
        let i = 500;
        const { statusCode, body } = await request(app).put('/api/v1/users/'+i).send(data).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }));
    });
    test('Debe devolver un código de estado 401, ok : false, msg : Debe ingresaer al menos una campo que actualizar', async () => {
        const token = await generateToken({role:"GOD"});
        let i = 3;
        const { statusCode, body } = await request(app).put('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(401);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }));
    });
    test('Debe devolver un código de estado 400, ok : false, msg : Debe ingresaer un id valido', async () => {
        const token = await generateToken({role:"GOD"});
        const data = {
            "email":"comun@guest.com",
            "username":"guest",
            "password":"guest",
            "firstname":"guest",
            "lastname":"guest"
         }
        let i = 'm';
        const { statusCode, body } = await request(app).put('/api/v1/users/'+i).send(data).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }));
    });
});
describe('DELETE /:id',() => {
    test('Debe devolver un código de estado 200 ok:true, msg: Usuario eliminado correctamente', async () => {
        const token = await generateToken({role:"GOD"});
        const user4 = {
            id:4,
            email:'gusetguest@guest.com',
            username:'guestguest',
            password:'guest',
            first_name: 'guestguest',
            last_name:'guestguest',
            profilepic:'https://media.istockphoto.com/vectors/administrative-professionals-day-secretaries-day-or-admin-day-holiday-vector-id1204416887?k=20&m=1204416887&s=612x612&w=0&h=tI6AmIGHRBv8NdL2KJHvHOtQ9nBhzAnX5yhmVNqrf-0=', 
            role:'GUEST'
        }
        const u = await db.Usuario.create(user4);
        let i = u.id;
        let { statusCode, body } = await request(app).delete('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
                        ok:expect.any(Boolean),
                        msg:expect.any(String),
                    }));
    });
    test('Debe devolver un código de estado 404, ok : false, msg : No se encontro el usuario id', async () => {
        const token = await generateToken({role:"GOD"});
        let i = 12;
        let { statusCode, body } = await request(app).delete('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
                        ok:expect.any(Boolean),
                        msg:expect.any(String),
                    }));
    });
    test('Debe devolver un código de estado 400, ok : false, msg : Debe ingresar un id valido', async () => {
        const token = await generateToken({role:"GOD"});
        let i = 'm';
        let { statusCode, body } = await request(app).delete('/api/v1/users/'+i).auth(token, {type:"bearer"});
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
                        ok:expect.any(Boolean),
                        msg:expect.any(String),
                    }));
    });
});