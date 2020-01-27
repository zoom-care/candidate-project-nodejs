const chai = require('chai');
const expect = chai.expect;
const should = chai.should();
const request = require('supertest');
const app = require('../app');

const authorizationHeader = 'Bearer: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjExMDg5NGFhLTIzOGEtNDdiYy1hNmQ3LWRmYTIwODUzMDk3NyIsImVtYWlsIjoic2hhbmUuamVmZmVyeTU0QGdtYWlsLmNvbSIsImlhdCI6MTU3Njk4Mjc2OSwiZXhwIjoxNTc3MDY5MTY5fQ.T9hlNSDBSYoSCSKbs01pJtEym9v2QCiYEXNqFaK6c4g';

describe('Create User API Tests', () => {
    it('Creates and returns user', (done) => {
        request(app).post('/graphql')
            .send({ query: `mutation { createUser(
                                                name: "Shane Jeffery",
                                                username: "shanejeffery54",
                                                email: "shane.jeffery54@gmail.com",
                                                address: {
                                                  street: "69th St",
                                                  city: "Vancouver",
                                                  zipcode: "98665",
                                                  geo: {
                                                    lat: "-41.1111",
                                                    lng: "-42.1111"
                                                  }
                                                },
                                                phoneNumbers: ["503-551-5363"],
                                                website: "github.com"
                                                ) { 
                                                    id username email
                                                } 
                                        }`
            })
            .set('Authorization', authorizationHeader)
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                const userData = res.body.data.createUser;

                res.body.should.be.a('object');
                userData.should.have.property('id');
                userData.should.have.property('username', 'shanejeffery54');
                userData.should.have.property('email', 'shane.jeffery54@gmail.com');

                done();
            });
    });

    it('Returns unauthorized error because of missing authorization header', (done) => {
        request(app).post('/graphql')
            .send({ query: `mutation { createUser(
                                                name: "Shane Jeffery",
                                                username: "shanejeffery54",
                                                email: "shane.jeffery54@gmail.com",
                                                address: {
                                                  street: "69th St",
                                                  city: "Vancouver",
                                                  zipcode: "98665",
                                                  geo: {
                                                    lat: "-41.1111",
                                                    lng: "-42.1111"
                                                  }
                                                },
                                                phoneNumbers: ["503-551-5363"],
                                                website: "github.com"
                                                ) { 
                                                    id username email
                                                } 
                                        }`
            })
            .expect(200)
            .end((err,res) => {
                if (err) return done(err);

                res.body.should.be.a('object');
                res.body.errors[0].should.have.property('message', 'Unauthorized.');
                done();
            });
    });
});