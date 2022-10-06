const request = require('supertest');
const { app, server } = require('../server');
const generateJWT = require('../helpers/generateJWT');
const db = require('../api/database/models');
const sinon = require('sinon')

describe('Status 500', () => {
    let sequelize;
    beforeEach(() => {
        db.sequelize.close();
        sequelize = new Sequelize('mysql://user:pass@example.com:5432/miEcommerce8_test') // Example for postgres
    })

    test('GOD Debe devolver la lista de productos', async () => {

        const token = await generateJWT({role: 'GOD'});
        const { statusCode, body } = await request(app).get('/api/v1/products').auth(token, {type:"bearer"});
        
        expect(statusCode).toEqual(500);
    })

})