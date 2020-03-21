const request = require('supertest');
const { expect } = require('chai');
const api = require('../../api');

describe('Health route |', () => {
    it('GET /health | returns 200 "ok"', async () => {
        const result = await request(api)
            .get('/health');

        expect(result.status).to.equal(200);
        expect(result.text).to.equal('ok');
    })
})
