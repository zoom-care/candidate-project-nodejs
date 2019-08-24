var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();

var chaiHttp = require('chai-http');
var server = require('../app');

chai.use(chaiHttp);

describe("API Routes", ()=>{

    it("Gets all users", done=>{
        chai.request('http://localhost:3001')
        .get("/api/users")
        .send()
        .end(function(err,res){
          res.should.be.json;
          res.body.length.should.equal(10);
          done();
        })
    });

 });
