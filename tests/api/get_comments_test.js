const request = require('supertest');
const { expect } = require('chai');
const api = require('../../api');

describe('Comments route |', () => {
    it('GET /comments/:postId | fetch comments for a post', async () => {
        const result = await request(api)
            .get('/comments/1');

        expect(result.status).to.equal(200);
        expect(result.body.length).to.equal(5);
    })
})
