const frisby = require('frisby')
const Joi = require('frisby').Joi

const host = 'http://localhost:3003/'

////////
// not a great way of creating a test server.  Would use a mock server before putting into production
////////

// basic library test
it('should be a teapot', function () {
    return frisby.get('http://httpbin.org/status/418')
        .expect('status', 418)
})

it("should have user record 1", function () {
    return frisby
        .get(host + 'users/1')
        .expect('status', 200)
        .expect('json', 'id', 1)
})

it("should retrieve all posts for a user", function () {
    return frisby
        .get(host + 'users/1/posts')
        .expect('status', 200)
        .expect('json', 'message', 'Posts listed')
        .expect('json', 'length', 10)
        .expect('jsonTypes', 'data.*', {
            'id': Joi.number(),
            'userId': Joi.number(),
            'title': Joi.string()
        })
})

// requirements tests
it("should create a new user, if authorized", function () {
    return frisby
        .setup({
            request: {
                headers: {Auth:'yes'}
            }
        })
        .post(host + 'users', {
            name: 'John Smith',
            username: 'john1'
        })
        .expect('status', 201)
        .expect('json', 'name', 'John Smith')
        .expect('jsonTypes', 'id', Joi.number())
})
it("should NOT create a new user, if UNauthorized", function () {
    return frisby
        .post(host + 'users', {
            name: 'John Smith',
            username: 'john1'
        })
        .expect('status', 401)
        .expect('header', 'WWW-Authenticate', 'Auth')
})
it("should retrieve all comments for a post", function () {
    return frisby
        .get(host + 'users/1/posts/1/comments')
        .expect('status', 200)
})
it("should update a post", function () {
    return frisby
        .put(host + 'users/1/posts/1', {
            title: 'A Better Title'
        })
        .expect('status', 200)
})
it("should delete a comment", function () {
    return frisby
        .del(host + 'users/1/posts/1/comments/1')
        .expect('status', 204)
})





