const request = require('supertest');
const { expect } = require('chai');
const api = require('../../api');
const db = require('../../config/loki').getDatabase();

describe('User route |', () => {
    it('POST /user | creates a user', async () => {
        const users = db.getCollection('users');
        const before = users.data.some(user => user.name === 'Test User');
        expect(before).to.equal(false);

        const result = await request(api)
            .post('/user')
            .send({
                name: 'Test User',
                username: 'test',
                email: 'test@email.com'
            });

        expect(result.status).to.equal(201);
        const after = users.data.some(user => user.name === 'Test User');
        expect(after).to.equal(true);
    })
})
