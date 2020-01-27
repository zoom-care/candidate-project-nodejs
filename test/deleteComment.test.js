const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const request = require('supertest');
const app = require('../app');

const authorizationHeader = 'Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMDg5NGFhLTIzOGEtNDdiYy1hNmQ3LWRmYTIwODUzMDk3NyIsImVtYWlsIjoic2hhbmUuamVmZmVyeTU0QGdtYWlsLmNvbSIsImlhdCI6MTU3Njk4Mjc2OSwiZXhwIjoxNTc3MDY5MTY5fQ.T9hlNSDBSYoSCSKbs01pJtEym9v2QCiYEXNqFaK6c4g';

describe('Delete Comment API Tests', () => {
    // after((done) => {
    //     app.close(done)
    // });

    it('Delete comment with id = 10', (done) => {
        request(app).post('/graphql')
            .send({ query: 'mutation { deleteComment(id: 10) { id } }'})
            .set('Authorization', authorizationHeader)
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                const commentData = res.body.data.deleteComment;

                res.body.should.be.a('object');
                commentData.should.have.property('id');
                done();
            });
    });

    it('Returns null for comment id 1000 because it does exist', (done) => {
        request(app).post('/graphql')
            .send({ query: 'mutation { deleteComment(id: 1000) { id } }'})
            .set('Authorization', authorizationHeader)
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                res.body.should.be.a('object');
                res.body.data.should.have.property('deleteComment', null);
                done();
            });
    });

    it('Returns unauthorized error because of missing authorization header', (done) => {
        request(app).post('/graphql')
            .send({ query: 'mutation { deleteComment(id: 10) { id } }'})
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                res.body.should.be.a('object');
                res.body.errors[0].should.have.property('message', 'Unauthorized.');
                done();
            });
    });
});