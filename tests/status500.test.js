/* const request = require('supertest');
const { app, server } = require('../server');
const generateJWT = require('../helpers/generateJWT');
const db = require('../api/database/models');

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
    db.sequelize.close();
    const DB = await db.Product.findAll();
    const { statusCode, body } = await request(app).post('/api/v1/products').send(data).auth(token, {type:"bearer"});
    const newDB = await db.Product.findAll();
    const productoCreado = newDB.at(-1);

    expect(statusCode).toEqual(500);

})
 */