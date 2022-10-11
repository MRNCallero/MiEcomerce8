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

describe('GET pictures of product /api/v1/pictures', () => {

    test('Usuario GOD - RUTA /api/v1/pictures - Debe devolver una lista con todas las pictures de un producto', async ()=>{
        const token = await generateJWT({role: 'GOD'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:1}).auth(token, {type:"bearer"});
        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:true,
            msg:expect.any(String),
            lista:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    url:expect.any(String),
                    id_product:expect.any(Number)
                })
            ])
        }))
    })
    test('Usuario GOD - RUTA /api/v1/pictures - se pasa un string no un id numerico, deve devolver mensaje de error', async ()=>{
        const token = await generateJWT({role: 'GOD'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:"asd"}).auth(token, {type:"bearer"});
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            ok:false,
            msg:expect.any(String),
        }))
    })
    test('Usuario GOD - RUTA /api/v1/pictures - Se pasanda un id que no existe devolver un mensaje informando que no existe el producto', async ()=>{
        const token = await generateJWT({role: 'GOD'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:90000}).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),

        }))
    });
    test('Usuario GOD - RUTA /api/v1/pictures - Se pasanda un id de un producto que no tiene imagenes', async ()=>{
        const token = await generateJWT({role: 'GOD'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:3}).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),

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
            msg:expect.any(String),
            lista:expect.arrayContaining([
                expect.objectContaining({
                    id:expect.any(Number),
                    url:expect.any(String),
                    id_product:expect.any(Number)
                })
            ])
        }))
    })
    test('Usuario ADMIN - RUTA /api/v1/pictures - se pasa un string no un id numerico, deve devolver mensaje de error', async ()=>{
        const token = await generateJWT({role: 'ADMIN'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:"asd"}).auth(token, {type:"bearer"});
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            ok:false,
            msg:expect.any(String),
        }))
    })
    test('Usuario ADMIN - RUTA /api/v1/pictures - Se pasanda un id que no existe devolver un mensaje informando que no existe el producto', async ()=>{
        const token = await generateJWT({role: 'ADMIN'});

        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:90000}).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),

        }))
    });
    test('Usuario ADMIN - RUTA /api/v1/pictures - Se pasanda un id de un producto que no tiene imagenes', async ()=>{
        const token = await generateJWT({role: 'ADMIN'});
        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:3}).auth(token, {type:"bearer"});
        console.log(statusCode)
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),

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
            msg:expect.any(String),
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
            msg:expect.any(String),

        }))
    });
    test('Usuario GUEST - RUTA /api/v1/pictures - Se pasanda un id de un producto que no tiene imagenes', async ()=>{
        const token = await generateJWT({role: 'GUEST'});
        const {body, statusCode} = await request(app).get("/api/v1/pictures").query({product:3}).auth(token, {type:"bearer"});
        console.log(statusCode)
        expect(statusCode).toEqual(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),

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
            msg:expect.any(String),
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
        
        const {body, statusCode} = await request(app).get("/api/v1/pictures/asd").auth(token, {type:"bearer"});
        
        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }))
        //-----------------------------------------------
    })
    test('Usuario GOD - RUTA /api/v1/pictures/id - pasar id foto no existe', async ()=>{
        
        const token = await generateJWT({role: 'GOD'});
        
        const {body, statusCode} = await request(app).get("/api/v1/pictures/100").auth(token, {type:"bearer"});
        
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }))
        //-----------------------------------------------
    })
    
    test('Usuario ADMIN - RUTA /api/v1/pictures/id - pasar id incorrecto', async ()=>{
        
        const token = await generateJWT({role: 'ADMIN'});
        
        const {body, statusCode} = await request(app).get("/api/v1/pictures/1").auth(token, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
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

        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }))
    })
    test('Usuario GOD - RUTA /api/v1/pictures/id - pasar id foto no existe', async ()=>{
        
        const token = await generateJWT({role: 'GOD'});
        
        const {body, statusCode} = await request(app).get("/api/v1/pictures/100").auth(token, {type:"bearer"});
        
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }))
    })
    //-----------------------------------------------
    test('Usuario GUEST - RUTA /api/v1/pictures/id - pasar id incorrecto', async ()=>{
        
        const token = await generateJWT({role: 'GUEST'});
        
        const {body, statusCode} = await request(app).get("/api/v1/pictures/1").auth(token, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
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

        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
        }))
    })
    test('Usuario GOD - RUTA /api/v1/pictures/id - pasar id foto no existe', async ()=>{
        
        const token = await generateJWT({role: 'GOD'});
        
        const {body, statusCode} = await request(app).get("/api/v1/pictures/100").auth(token, {type:"bearer"});
        
        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
            ok:expect.any(Boolean),
            msg:expect.any(String),
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
         const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth("", {type:"bearer"});
   
         expect(statusCode).toEqual(401);
         expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String)
            })
        )

    });
    test('Usuario no permitido GUEST- RUTA /api/v1/pictures - Debe informar que no se tiene acceso', async () => {
        const token = await generateJWT({role: 'GUEST'});
        const data = {
            "url": "nuevaURL",
            "description":"una descripcion",
            "id_product": 1
         };
         const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});
   
         expect(statusCode).toEqual(400);
         expect(body).toEqual(expect.objectContaining({
                error:expect.any(String)
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

        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});
        
        const newDB = await db.Picture.findAll();

        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            ok:true,
            msg:expect.any(String),
            picture:expect.objectContaining({
                url:newDB.at(-1).url,
                id_product:newDB.at(-1).id_product
            })
        }))
    });
    test('Usuario GOD - RUTA /api/v1/pictures - Se pasa una foto sin url, debe devolver un error', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
           "description":"una descripcion",
           "id_product": 1
        };
        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});
  
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors:expect.arrayContaining([
                expect.objectContaining({
                    msg:expect.any(String),
                    param:expect.any(String),
                    location:expect.any(String)
            })
        ])
    }))
    });
    test('Usuario GOD - RUTA /api/v1/pictures - Se pasa una foto sin id del producto, debe devolver un error', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
            "url": "nuevaURL",
           "description":"una descripcion",
        };
        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});
  
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors:expect.arrayContaining([
                expect.objectContaining({
                    msg:expect.any(String),
                    param:expect.any(String),
                    location:expect.any(String)
            })
        ])
    }))
    });
    test('Usuario GOD - RUTA /api/v1/pictures - Se pasa una foto sin datos, debe devolver un error', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
        };
        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});
  
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors:expect.arrayContaining([
                expect.objectContaining({
                    msg:expect.any(String),
                    param:expect.any(String),
                    location:expect.any(String)
            })
        ])
    }))
    });
    test('Usuario GOD - RUTA /api/v1/pictures - Se pasa id producto que no existe, debe mandar mensaje de error', async () => {
        const token = await generateJWT({role: 'GOD'});
        const data = {
           "url": "nuevaURL",
           "description":"una descripcion",
           "id_product": 900000
        };

        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            ok:false,
            msg:expect.any(String),
        }))
    });
    test('Usuario ADMIN - RUTA /api/v1/pictures - Debe crear una picture en la base de datos', async () => {
        const token = await generateJWT({role: 'ADMIN'});
        const data = {
           "url": "nuevaURL",
           "description":"una descripcion",
           "id_product": 1
        };
        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});
  
        const newDB = await db.Picture.findAll();

        expect(statusCode).toEqual(201);
        expect(body).toEqual(expect.objectContaining({
            ok:true,
            msg:expect.any(String),
            picture:expect.objectContaining({
                url:newDB.at(-1).url,
                id_product:newDB.at(-1).id_product
            })
        }))
    });
    test('Usuario ADMIN - RUTA /api/v1/pictures - Se pasa una foto sin url, debe devolver un error', async () => {
        const token = await generateJWT({role: 'ADMIN'});
        const data = {
           "description":"una descripcion",
           "id_product": 1
        };
        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});
  
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors:expect.arrayContaining([
                expect.objectContaining({
                    msg:expect.any(String),
                    param:expect.any(String),
                    location:expect.any(String)
                })
            ])  
        }))
    });
    test('Usuario ADMIN - RUTA /api/v1/pictures - Se pasa una foto sin id del producto, debe devolver un error', async () => {
        const token = await generateJWT({role: 'ADMIN'});
        const data = {
            "url": "nuevaURL",
           "description":"una descripcion",
        };
        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});
  
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors:expect.arrayContaining([
                expect.objectContaining({
                    msg:expect.any(String),
                    param:expect.any(String),
                    location:expect.any(String)
                })
            ])
        }))
    });
    test('Usuario ADMIN - RUTA /api/v1/pictures - Se pasa una foto sin datos, debe devolver un error', async () => {
        const token = await generateJWT({role: 'ADMIN'});
        const data = {
        };
        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});
  
        expect(statusCode).toEqual(400);
        expect(body).toEqual(expect.objectContaining({
            errors:expect.arrayContaining([
                expect.objectContaining({
                    msg:expect.any(String),
                    param:expect.any(String),
                    location:expect.any(String)
                })
            ])
        }))
    });
    test('Usuario ADMIN - RUTA /api/v1/pictures - Se pasa id producto que no existe, debe mandar mensaje de error', async () => {
        const token = await generateJWT({role: 'ADMIN'});
        const data = {
           "url": "nuevaURL",
           "description":"una descripcion",
           "id_product": 900000
        };

        const {body,statusCode} = await request(app).post('/api/v1/pictures').send(data).auth(token, {type:"bearer"});

        expect(statusCode).toEqual(404);
        expect(body).toEqual(expect.objectContaining({
            ok:false,
            msg:expect.any(String),
        }))
    });
})
describe('PUT picture /api/v1/pictures', () => {

    test('Sin usuario - RUTA /api/v1/pictures - Debe devolver un mensaje informando que el token es invalido', async ()=>{
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put("/api/v1/pictures/1").send(pictureEdit);

        expect(statusCode).toBe(401);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String)
            })
        );
    })
    test('Usuario GUEST - RUTA /api/v1/pictures - Debe devolver un mensaje informando que no se tienen credenciales', async ()=>{
        const token = await generateJWT({role: 'GUEST'});
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put("/api/v1/pictures/1").send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                error:expect.any(String)
            })
        );
    })
    //--------------------------------
    test('Usuario GOD  - RUTA /api/v1/pictures/id - Debe devolver un mensaje que se edito correctamente y la picture editada', async()=>{
        const idPicture = 1;
        const token = await generateJWT({role: 'GOD'});
        
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
                ok:true,
                msg:expect.any(String),
                picture:expect.objectContaining({
                    id:idPicture,
                    url:pictureEdit.url,
                    description:pictureEdit.description,
                    id_product:pictureEdit.id_product
                })
            })
        );
    })
    test('Usuario GOD  - RUTA /api/v1/pictures/id - ID de picture incorrecto, debe devolver mensaje de error', async()=>{
        const idPicture = "asd";
        const token = await generateJWT({role: 'GOD'});
        
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })
    test('Usuario GOD  - RUTA /api/v1/pictures/id - ID de picture inexistente, debe devolver mensaje de error', async()=>{
        const idPicture = -1;
        const token = await generateJWT({role: 'GOD'});
        
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })
    test('Usuario GOD  - RUTA /api/v1/pictures/id - Editar picture con id product incorrecto, debe devolver mensaje de error', async()=>{
        const idPicture = 1;
        const token = await generateJWT({role: 'GOD'});
        
        const pictureEdit = {
            "id_product":"asdsd",
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })
    test('Usuario GOD  - RUTA /api/v1/pictures/id - No pasarle la id de la picture, debe devolver mensaje de error', async()=>{

        const token = await generateJWT({role: 'GOD'});
        
        const pictureEdit = {
            "id_product":"asdsd",
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put(`/api/v1/pictures/`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })
    //-------------------------------------------
    test('Usuario ADMIN  - RUTA /api/v1/pictures/id - Debe devolver un mensaje que se edito correctamente y la picture editada', async()=>{
        const idPicture = 1;
        const token = await generateJWT({role: 'ADMIN'});
        
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
                ok:true,
                msg:expect.any(String),
                picture:expect.objectContaining({
                    id:idPicture,
                    url:pictureEdit.url,
                    description:pictureEdit.description,
                    id_product:pictureEdit.id_product
                })
            })
        );
    })
    test('Usuario ADMIN  - RUTA /api/v1/pictures/id - ID de picture incorrecto, debe devolver mensaje de error', async()=>{
        const idPicture = "asd";
        const token = await generateJWT({role: 'GOD'});
        
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })
    test('Usuario ADMIN  - RUTA /api/v1/pictures/id - ID de picture inexistente, debe devolver mensaje de error', async()=>{
        const idPicture = -1;
        const token = await generateJWT({role: 'ADMIN'});
        
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })
    test('Usuario ADMIN  - RUTA /api/v1/pictures/id - Editar picture con id product incorrecto, debe devolver mensaje de error', async()=>{
        const idPicture = 1;
        const token = await generateJWT({role: 'ADMIN'});
        
        const pictureEdit = {
            "id_product":"asdsd",
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })
    test('Usuario ADMIN  - RUTA /api/v1/pictures/id - No pasarle la id de la picture, debe devolver mensaje de error', async()=>{

        const token = await generateJWT({role: 'ADMIN'});
        
        const pictureEdit = {
            "id_product":"asdsd",
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).put(`/api/v1/pictures/`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })

})
describe('DELETE picture /api/v1/pictures', () => {

    test('Sin usuario - RUTA /api/v1/pictures - Debe devolver un mensaje informando que el token es invalido', async ()=>{
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).delete("/api/v1/pictures/1").send(pictureEdit);

        expect(statusCode).toBe(401);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String)
            })
        );
    })
    test('Usuario GUEST - RUTA /api/v1/pictures - Debe devolver un mensaje informando que no se tienen credenciales', async ()=>{
        const token = await generateJWT({role: 'GUEST'});
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).delete("/api/v1/pictures/1").send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                error:expect.any(String)
            })
        );
    })
    //-----------------------------------------------
    test('Usuario GOD  - RUTA /api/v1/pictures/id - Debe eliminar picture y retornar la picture eliminada', async()=>{
        const picture = await db.Picture.create({
            url:"https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/04/brad-west-kzloZDPHzeg-unsplash-scaled.jpg?w=2560&quality=60&strip=all&ssl=1",
            id_product:1
        })

        const idPicture = picture.id;
        const token = await generateJWT({role: 'GOD'});
        
        const {body,statusCode} = await request(app).delete(`/api/v1/pictures/${idPicture}`).auth(token, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
                ok:true,
                msg:expect.any(String),
                picture: expect.objectContaining({
                    id:idPicture,
                    id_product:picture.id_product,
                    url:picture.url
                })
            })
        );
    })
    test('Usuario GOD  - RUTA /api/v1/pictures/id - ID de picture incorrecto, debe devolver mensaje de error', async()=>{
        const idPicture = "asd";
        const token = await generateJWT({role: 'GOD'});
        
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).delete(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })
    test('Usuario GOD  - RUTA /api/v1/pictures/id - ID de picture inexistente, debe devolver mensaje de error', async()=>{
        const idPicture = -1;
        const token = await generateJWT({role: 'GOD'});
        
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).delete(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })
    //-----------------------------------------------
    test('Usuario ADMIN  - RUTA /api/v1/pictures/id - Debe eliminar picture y retornar la picture eliminada', async()=>{
        const picture = await db.Picture.create({
            url:"https://i0.wp.com/imgs.hipertextual.com/wp-content/uploads/2022/04/brad-west-kzloZDPHzeg-unsplash-scaled.jpg?w=2560&quality=60&strip=all&ssl=1",
            id_product:1
        })

        const idPicture = picture.id;
        const token = await generateJWT({role: 'GOD'});
        
        const {body,statusCode} = await request(app).delete(`/api/v1/pictures/${idPicture}`).auth(token, {type:"bearer"});

        expect(statusCode).toBe(200);
        expect(body).toEqual(expect.objectContaining({
                ok:true,
                msg:expect.any(String),
                picture: expect.objectContaining({
                    id:idPicture,
                    id_product:picture.id_product,
                    url:picture.url
                })
            })
        );
    })
    test('Usuario ADMIN  - RUTA /api/v1/pictures/id - ID de picture incorrecto, debe devolver mensaje de error', async()=>{
        const idPicture = "asd";
        const token = await generateJWT({role: 'ADMIN'});
        
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).delete(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(400);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })
    test('Usuario ADMIN  - RUTA /api/v1/pictures/id - ID de picture inexistente, debe devolver mensaje de error', async()=>{
        const idPicture = -1;
        const token = await generateJWT({role: 'ADMIN'});
        
        const pictureEdit = {
            "id_product":3,
            "description":"Foto Oreo",
            "url":"https://img.freepik.com/vector-gratis/icono-vector-galletas-chocolate-oreo-pila-embems-marca-aislado-sobre-fondo-blanco_528282-135.jpg?size=626&ext=jpg"
        }
        const {body,statusCode} = await request(app).delete(`/api/v1/pictures/${idPicture}`).send(pictureEdit).auth(token, {type:"bearer"});

        expect(statusCode).toBe(404);
        expect(body).toEqual(expect.objectContaining({
                ok:false,
                msg:expect.any(String),
            })
        );
    })


})
