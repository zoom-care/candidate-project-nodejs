const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const request = require('supertest');
const app = require('../app');

const authorizationHeader = 'Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMDg5NGFhLTIzOGEtNDdiYy1hNmQ3LWRmYTIwODUzMDk3NyIsImVtYWlsIjoic2hhbmUuamVmZmVyeTU0QGdtYWlsLmNvbSIsImlhdCI6MTU3Njk4Mjc2OSwiZXhwIjoxNTc3MDY5MTY5fQ.T9hlNSDBSYoSCSKbs01pJtEym9v2QCiYEXNqFaK6c4g';

describe('Update Post API Tests', () => {
    it('Updates and returns post with id = 3', (done) => {
        request(app).post('/graphql')
            .send({ query: 'mutation { updatePost(id: 3, userId: 10000, title: "boohoo", body: "Whatever...") { id userId body title } }'})
            .set('Authorization', authorizationHeader)
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                const postData = res.body.data.updatePost;

                res.body.should.be.a('object');
                postData.should.have.property('id', 3);
                postData.should.have.property('userId', 10000);
                postData.should.have.property('title', 'boohoo');
                postData.should.have.property('body', 'Whatever...');

                done();
            });
    });

    it('Returns unauthorized error because of missing authorization header', (done) => {
        request(app).post('/graphql')
            .send({ query: 'mutation { updatePost(id: 3, userId: 10000, title: "boohoo", body: "Whatever...") { id userId body title } }'})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                res.body.should.be.a('object');
                res.body.errors[0].should.have.property('message', 'Unauthorized.');
                done();
            });
    });
});