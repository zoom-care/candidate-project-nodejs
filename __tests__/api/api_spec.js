const frisby = require('frisby')

// basic library test
it('should be a teapot', function () {
    return frisby.get('http://httpbin.org/status/418')
        .expect('status',418)
})

it("should have user record 1", function () {
    return frisby
        .get('http://localhost:3001/users/1')
        .expect('status',200)
        .expect('json','id',1)
})
