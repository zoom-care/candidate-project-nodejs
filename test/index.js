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

    it("Fails to Create a new user - no auth", done => {
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
          res.should.have.status(401);
          res.text.should.equal("Unauthorized");
          done();
      })
    })


    it("Creates a new user", done => {
      chai.request(serverAddress)
      .post("/api/users/")
      .set('Authorization','Bearer Hello1234')
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

    it("Fails to Update a post - no Auth", done => {
      chai.request(serverAddress)
      .patch("/api/posts/1")
      .send({
        title:"This is the new Title"
      })
      .end(function(err,res){
        res.should.have.status(401);
        res.text.should.equal("Unauthorized");
        done();
        })
    })

    it("Updates a post", done => {
      chai.request(serverAddress)
      .patch("/api/posts/1")
      .set("Authorization","Bearer Test4321")
      .send({
        title:"This is the new Title"
      })
      .end(function(err,res){
        res.should.have.status(200);
        res.text.should.equal("/api/posts/1");

        //This will check that our change actually worked
        return chai.request(serverAddress)
        .get(res.text)
        .send()
        .end(function(err,res){
          res.body.title.should.equal("This is the new Title");
          done();

          })
        })
    })

    it("Gets gets all comments for a post", done=>{
      chai.request(serverAddress)
      .get("/api/comments/posts/1")
      .send()
      .end(function(err,res){
        res.should.be.json;
        res.body.length.should.equal(5);
        done();
      })
  });


 });
