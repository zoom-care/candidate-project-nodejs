const request = require('supertest');
const { expect } = require('chai');
const api = require('../../api');
const db = require('../../config/loki').getDatabase();

describe('Comments route |', () => {
    it('GET /comments/:postId | fetch comments for a post', async () => {
        const result = await request(api)
            .get('/comments/1');

        expect(result.status).to.equal(200);
        expect(result.body.length).to.equal(5);
    })

    it('DELETE /comment/:commentId | deletes a comment', async () => {
        const comments = db.getCollection('comments');
        const before = comments.findOne({ id: 1 });
        expect(before).to.not.equal(null);

        const result = await request(api)
            .delete('/comment/1')
            .set('authorization', 'foo')
            .send();

        expect(result.status).to.equal(200);
        const after = comments.findOne({ id: 1 });
        expect(after).to.equal(null);

        const allComments = comments.find();
        expect(allComments.length).to.equal(499);
    })

    it('DELETE /user | fails without authorization header', async () => {
        const result = await request(api)
            .delete('/comment/1')
            .send();

        expect(result.status).to.equal(401);

        const result2 = await request(api)
            .delete('/comment/1')
            .set('authorization', '')
            .send();

        expect(result2.status).to.equal(401);
    })
})
