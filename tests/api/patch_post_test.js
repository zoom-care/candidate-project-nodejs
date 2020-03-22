const request = require('supertest');
const { expect } = require('chai');
const api = require('../../api');
const db = require('../../config/loki').getDatabase();

describe('Post route |', () => {
    it('PATCH /post/:postId | updates a post', async () => {
        const result = await request(api)
            .patch('/post/1')
            .set('authorization', 'foo')
            .send({
                body: 'updated body'
            });

        expect(result.status).to.equal(200);

        const posts = db.getCollection('posts');
        const post = posts.findOne({ id: 1 });
        expect(post.body).to.equal('updated body');
    })

    it('PATCH /post/:postId | attempt to update non-existant post fails', async () => {
        const result = await request(api)
            .patch('/post/999')
            .set('authorization', 'foo')
            .send({
                body: 'updated body'
            });

        expect(result.status).to.equal(404);
    })

    it('PATCH /post/:postId | fails without authorization header', async () => {
        const result = await request(api)
            .patch('/post/1')
            .send({
                body: 'updated body'
            });

        expect(result.status).to.equal(401);

        const result2 = await request(api)
            .patch('/post/1')
            .set('authorization', '')
            .send({
                body: 'updated body'
            });

        expect(result2.status).to.equal(401);
    })
})
