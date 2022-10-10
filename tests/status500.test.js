const request = require('supertest');
const { app, server } = require('../server');
const generateJWT = require('../helpers/generateJWT');
const db = require('../api/database/models');


description('Pruebas error 500 picture',()=>{
    beforeAll(async() =>{
        db.sequelize.query('drop database `MiEcommerce_test`')
        await db.sequelize.close();
    })
})
test('Server error get picture', async () => {
    const token = await generateJWT({role: 'GOD'});

    const data = {
        title: "Producto test",
        price: 5,
        mostwanted: 0,
        stock: 1,
        description: "Esto es una prueba",
        id_category: 1
    }
    const { statusCode, body } = await request(app).get('/api/v1/products').send(data).auth(token, {type:"bearer"});

    expect(statusCode).toEqual(500);

})
 