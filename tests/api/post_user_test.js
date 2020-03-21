const request = require('supertest');
const { expect } = require('chai');
const api = require('../../api');
const db = require('../../config/loki').getDatabase();

describe('User route |', () => {
    it('POST /user | creates a user', async () => {
        const users = db.getCollection('users');
        const before = users.findOne({ name: 'Test User' });
        expect(before).to.equal(null);

        const result = await request(api)
            .post('/user')
            .set('authorization', 'foo')
            .send({
                name: 'Test User',
                username: 'test',
                email: 'test@email.com'
            });

        expect(result.status).to.equal(201);
        const after = users.findOne({ name: 'Test User' });
        expect(after).to.not.equal(null);
    })

    it('POST /user | fails without authorization header', async () => {
        const result = await request(api)
            .post('/user')
            .send({
                name: 'Test User',
                username: 'test',
                email: 'test@email.com'
            });

        expect(result.status).to.equal(401);

        const result2 = await request(api)
            .post('/user')
            .set('authorization', '')
            .send({
                name: 'Test User',
                username: 'test',
                email: 'test@email.com'
            });

        expect(result2.status).to.equal(401);
    })
})
