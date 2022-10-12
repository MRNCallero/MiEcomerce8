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
        id_user:4,
        id_product:1,
        date:"2022-10-3",
        quantity:3
    };
    const cart1 = {
        id_user:3,
        id_product:2,
        date:"2022-9-3",
        quantity:5
    };  
    const cart2 = {
        id_user:3,
        id_product:1,
        date:"2022-8-3",
        quantity:3
    };
    const cart3 = {
        id_user:3,
        id_product:4,
        date:"2022-8-3",
        quantity:3
    };
    const user = {
        id:1,
        email:'god@god.com',
        username:'god',
        password:'god',
        first_name: 'Diosito',
        last_name:'TodoPoderoso',
        profilepic:'https://media.istockphoto.com/photos/hands-of-god-picture-id157377707?k=20&m=157377707&s=612x612&w=0&h=K-dH2tCJGpQONcmvauRMeVnm-r5QdL4NipRDokHXukI=', 
        role:'GOD'
    };
    const user2 = {
        id:2,
        email:'admin@admin.com',
        username:'Admin',
        password:'Admin',
        first_name: 'ElAdmin',
        last_name:'NoTanPoderoso',
        profilepic:'https://media.istockphoto.com/vectors/administrative-professionals-day-secretaries-day-or-admin-day-holiday-vector-id1204416887?k=20&m=1204416887&s=612x612&w=0&h=tI6AmIGHRBv8NdL2KJHvHOtQ9nBhzAnX5yhmVNqrf-0=', 
        role:'ADMIN'
    };
    const user3 = {
        id:3,
        email:'guset@guest.com',
        username:'guest',
        password:'guest',
        first_name: 'guest',
        last_name:'guest',
        profilepic:'https://media.istockphoto.com/vectors/administrative-professionals-day-secretaries-day-or-admin-day-holiday-vector-id1204416887?k=20&m=1204416887&s=612x612&w=0&h=tI6AmIGHRBv8NdL2KJHvHOtQ9nBhzAnX5yhmVNqrf-0=', 
        role:'GUEST'
    };
    const user4 = {
        id:4,
        email:'guset2@guest.com',
        username:'guest2',
        password:'guest2',
        first_name: 'guest2',
        last_name:'guest2',
        profilepic:'https://media.istockphoto.com/vectors/administrative-professionals-day-secretaries-day-or-admin-day-holiday-vector-id1204416887?k=20&m=1204416887&s=612x612&w=0&h=tI6AmIGHRBv8NdL2KJHvHOtQ9nBhzAnX5yhmVNqrf-0=', 
        role:'GUEST'
    };


    const producto1 = {
        id:1,
        title: "Marley",
        price: 30,
        id_category: 2,
        description: "Extra dulce de leche",
        stock: 5
    };
    const producto2 = {
        id:2,
        title: "Coca-Cola",
        price: 100,
        id_category: 1,
        description: "Sin Azucar",
        stock: 10
    };
    const producto3 = {
        id:3,
        title: "Pepsi",
        price: 130,
        id_category: 1,
        description: "Ligth",
        stock: 5
    };
    const producto4 = {
        id:4,
        title: "Portezuelo",
        price: 20,
        id_category: 2,
        description: "Chocolate blanco",
        stock: 5
    };
    const producto5 = {
        id:5,
        title: "Oreos",
        price: 20,
        id_category: 2,
        description: "Clasicas",
        stock: 0
    };
    const picture = {
        id:1,
        url:"https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/04/brad-west-kzloZDPHzeg-unsplash-scaled.jpg?w=2560&quality=60&strip=all&ssl=1",
        id_product:1
    };
    const picture1 = {
        id:2,
        url:"https://cdn.shopify.com/s/files/1/0374/1987/6483/products/marley-blanco_150x.jpg?v=1647453689",
        id_product:1
    };
    const picture2 = {
        id:3,
        url:"https://www.coca-coladeuruguay.com.uy/content/dam/journey/uy/es/private/brands/coca-cola/Large_product_shot_cocacolaoriginal.png",
        id_product:2
    };


    await db.Categoria.create(categoria1);
    await db.Categoria.create(categoria2);
    await db.Categoria.create(categoria3);

    //Productos
    await db.Product.create(producto1);
    await db.Product.create(producto2);
    await db.Product.create(producto3);
    await db.Product.create(producto4);
    await db.Product.create(producto5);
    //Picture
    await db.Picture.create(picture);
    await db.Picture.create(picture1);
    await db.Picture.create(picture2);
    //usuarios
    await db.Usuario.create(user);
    await db.Usuario.create(user2);
    await db.Usuario.create(user3);
    await db.Usuario.create(user4);
    //cart
    await db.Cart.create(cart);
    await db.Cart.create(cart1);
    await db.Cart.create(cart2);
    await db.Cart.create(cart3);


});
    
afterEach(async () => {
    await db.Cart.destroy({where:{}});
    await db.Usuario.destroy({where:{}});
    await db.Picture.destroy({where:{}});
    await db.Product.destroy({where:{}});
    await db.Categoria.destroy({where:{}})
    server.close();
});

const getCart = async (id_user) => {
    const uCart = await db.Cart.findAll({
        where: {
            id_user: id_user
        }
    });
    let retList = [];
    for(let index in uCart ){
        let elem = uCart[index];
        let prod = await db.Product.findByPk(elem.id_product);
        retList.push({
            product: prod.dataValues,
            date: elem.date,
            quantity: elem.quantity
        });
    }
    return retList;
}

describe('GET Carts', () => {

    test('Se necesita token para el listado', async () => {
        const token = "cualquierCOsa";

        const { statusCode, body } = await request(app).get('/api/v1/carts/' + 1).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(401);
        expect(body).toEqual(
            expect.objectContaining({
                ok:false,
                msg: "Token invalido"
            })
        )
    })

    test('Error cuando el usuario no existe', async () => {
        const token = await generateJWT({role: 'GOD'});

        const { statusCode, body } = await request(app).get('/api/v1/carts/' + 5).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(404);
        expect(body).toEqual(
            expect.objectContaining({
                ok:false,
                message:"User does not exist"
            })
        );
    })

    test('GOD puede ver cualquier carrito', async () => {
        const token = await generateJWT({role: 'GOD'});

        const cart = await getCart(3);
        const { statusCode, body } = await request(app).get('/api/v1/carts/' + 3).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining(cart));
    })

    test('GOD puede ver cualquier carrito, carrito vacio', async () => {
        const token = await generateJWT({role: 'GOD'});

        const cart = await getCart(2);
        const { statusCode, body } = await request(app).get('/api/v1/carts/' + 2).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(cart.length).toEqual(0);
        expect(body).toEqual(
            expect.objectContaining({
                message:"Cart is empty",
                ok:true
            })
        )
    })

    test('ADMIN puede ver cualquier carrito', async () => {
        const token = await generateJWT({role: 'ADMIN'});

        const cart = await getCart(3);
        const { statusCode, body } = await request(app).get('/api/v1/carts/' + 3).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining(cart));

    })

    test('ADMIN puede ver cualquier carrito, carrito vacio', async () => {
        const token = await generateJWT({role: 'ADMIN'});

        const cart = await getCart(1);
        const { statusCode, body } = await request(app).get('/api/v1/carts/' + 1).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(cart.length).toEqual(0);
        expect(body).toEqual(
            expect.objectContaining({
                message:"Cart is empty",
                ok:true
            })
        )
    })


    test('GUEST puede ver su carrito', async () => {
        const token = await generateJWT({id: 3, role: 'GUEST'});

        const cart = await getCart(3);
        const { statusCode, body } = await request(app).get('/api/v1/carts/' + 3).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining(cart));
    })

    test('GUEST no puede ver otros carritos', async () => {
        const token = await generateJWT({id: 3, role: 'GUEST'});

        const { statusCode, body } = await request(app).get('/api/v1/carts/' + 1).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(403);
        expect(body).toEqual(
            expect.objectContaining({
                error: "No tienes las credenciales necesarias para acceder"
            })
        )
    })

})

describe('PUT Carts', () => {

    const newCart = [
        {
            "product": 1,
            "quantity": 3
        },
        {
            "product": 2,
            "quantity": 4
        },
        {
            "product": 4,
            "quantity": 4
        },
        {
            "product": 3,
            "quantity": 6
        }
    ];

    const noStockCart = [
        {
            "product": 5,
            "quantity": 6
        }
    ];

    const fakeCart = [
        {
            "product": 7,
            "quantity": 6
        }
    ];

    test('Se necesita token para editar carritos', async () => {
        const token = "cualquierCOsa";

        const { statusCode, body } = await request(app).put('/api/v1/carts/' + 1).send(newCart).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(401);
        expect(body).toEqual(
            expect.objectContaining({
                ok:false,
                msg: "Token invalido"
            })
        )
    })

    test('Error cuando el usuario no existe', async () => {
        const token = await generateJWT({role: 'GOD'});

        const { statusCode, body } = await request(app).put('/api/v1/carts/' + 5).send(newCart).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(404);
        expect(body).toEqual(
            expect.objectContaining({
                ok:false,
                message:"User does not exist"
            })
        )
    })

    test('Error cuando envio un producto que no existe', async () => {
        const token = await generateJWT({role: 'GOD'});

        const beforeCart = await getCart(3);
        const { statusCode, body } = await request(app).put('/api/v1/carts/' + 3).send(fakeCart).auth(token, {type:"bearer"});
        const afterCart = await getCart(3);

        expect(statusCode).toEqual(400);
        expect(beforeCart).toEqual(afterCart);
        expect(body).toEqual(
            expect.objectContaining({
                ok: false,
                message: "Some products does not exist",
            })
        )
    })

    test('GOD puede editar cualquier carrito, elemento sin stock', async () => {
        const token = await generateJWT({role: 'GOD'});

        const { statusCode, body } = await request(app).put('/api/v1/carts/' + 3).send(noStockCart).auth(token, {type:"bearer"});
        const cart = await getCart(3);

        expect(statusCode).toEqual(201);
        expect(cart.length).toEqual(0);
        expect(body).toEqual(expect.objectContaining(cart));

    })

    test('GOD puede editar cualquier carrito', async () => {
        const token = await generateJWT({role: 'GOD'});

        const { statusCode, body } = await request(app).put('/api/v1/carts/' + 3).send(newCart).auth(token, {type:"bearer"});
        const cart = await getCart(3);

        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining(cart));

    })

    test('ADMIN no puede editar carritos de otras personas', async () => {
        const token = await generateJWT({role: 'ADMIN'});

        const beforeCart = await getCart(3);
        const { statusCode, body } = await request(app).put('/api/v1/carts/' + 3).send(newCart).auth(token, {type:"bearer"});
        const afterCart = await getCart(3);

        expect(statusCode).toEqual(403);
        expect(beforeCart).toEqual(afterCart);

    })

    test('ADMIN puede editar su carrito', async () => {
        const token = await generateJWT({id:2, role: 'ADMIN'});

        const beforeCart = await getCart(2);
        const { statusCode, body } = await request(app).put('/api/v1/carts/' + 2).send(newCart).auth(token, {type:"bearer"});
        const afterCart = await getCart(2);

        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining(afterCart));
        expect(beforeCart.length).toEqual(0);

    })


    test('GUEST no puede editar otro carrito', async () => {
        const token = await generateJWT({id: 3, role: 'GUEST'});

        const beforeCart = await getCart(4);
        const { statusCode, body } = await request(app).put('/api/v1/carts/' + 4).send(newCart).auth(token, {type:"bearer"});
        const afterCart = await getCart(4);

        expect(statusCode).toEqual(403);
        expect(beforeCart).toEqual(afterCart);
    })

    test('GUEST puede editar su carritos', async () => {
        const token = await generateJWT({id: 3, role: 'GUEST'});

        const beforeCart = await getCart(3);
        const { statusCode, body } = await request(app).put('/api/v1/carts/' + 3).send(newCart).auth(token, {type:"bearer"});
        const afterCart = await getCart(3);

        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining(afterCart));
        expect(body).not.toEqual(expect.objectContaining(beforeCart));
    })

})