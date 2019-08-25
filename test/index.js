var mocha = require('mocha');
var chai = require('chai');
var should = chai.should();

var chaiHttp = require('chai-http');
var server = require('../app');

chai.use(chaiHttp);
let serverAddress = 'http://localhost:3001'

describe("API Routes", ()=>{

    it("Gets all users", done=>{
        chai.request(serverAddress)
        .get("/api/users")
        .send()
        .end(function(err,res){
          res.should.be.json;
          res.body.length.should.equal(10);
          done();
        })
    });

    it("Creates a new user", done => {
      chai.request(serverAddress)
      .post("/api/users/")
      .send(
        {
          "name": "Aaron Eiche",
          "username": "aeiche",
          "email": "aeiche@aaroneiche.com",
          "address": {
              "street": "12345 SW North",
              "city": "Portland",
              "zipcode": "97213",
              "geo": {
                  "lat": "-37.3159",
                  "lng": "81.1496"
              }
          },
          "phoneNumbers": [
              "1-503-334-9164"
          ],
          "website": "aeiche.com"
      })
      .end(function(err,res){
          res.should.have.status(201);
          res.text.should.equal("/api/users/11");
          done();
      })
    })

    it("Updates a post", done => {
      chai.request(serverAddress)
      .patch("/api/posts/1")
      .send({
        title:"This is the new Title"
      })
      .end(function(err,res){
        res.should.have.status(200);
        res.text.should.equal("/api/posts/1");
        done();
      })
    })

 });
