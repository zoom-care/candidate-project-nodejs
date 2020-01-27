const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const request = require('supertest');
const app = require('../app');

describe('Get Post API Tests', () => {
    // after((done) => {
    //     app.close(done)
    // });

    it('Returns post with id = 2', (done) => {
        request(app).post('/graphql')
            .send({ query: '{ getPost(id: 2) { id userId body title comments { id postId name email body } } }'})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                const postData = res.body.data.getPost;

                res.body.should.be.a('object');
                postData.should.have.property('id');
                postData.should.have.property('userId');
                postData.should.have.property('body');
                postData.should.have.property('title');
                postData.should.have.property('comments');
                done();
            });
    });

    it('Returns null for post id 500 because it does exist', (done) => {
        request(app).post('/graphql')
            .send({ query: '{ getPost(id: 500) { id userId body title comments { id postId name email body } } }'})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                res.body.should.be.a('object');
                res.body.data.should.have.property('getPost', null);
                done();
            });
    });
});