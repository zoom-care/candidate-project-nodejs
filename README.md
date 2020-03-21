# ZOOM+Care Candidate Code Challenge - NodeJS API

## modification to add start of simple front-end
I took less than an hour to start adding a front end to consume the API
* ```npm run start:server``` to run back-end on port 3001
* ```npm run start:client``` to run front-end on localhost:1234
* ```npm start``` to run both

-----

![ZOOM+Care Logo](https://avatars0.githubusercontent.com/u/48925141?s=150)

Welcome to the ZOOM+Care NodeJS API Candidate Code Challenge. If you are here you most likely have interest in joining the ZOOM+Care Software Engineering Team and asked to choose one of our software development challenges. If you came here on your own, you are welcome to explore the challenge and use it to sharpen your skills or prepare for future interviews.

The ZOOM+Care Candidate Code Challenges are intended to take between 1 and 2 hours to complete. This is not intended to be an extensive test of your programing skills or knowledge, but rather as a starting point for further conversations during the application process.

## Instructions
This Candidate Code Challenge is geared toward developers with experience in JavaScript and NodeJS. The objective is to create an API that exposes several CRUD operations over HTTP for a predefined data schema. The data schema for this challenge is simple: A user (which is a writer) has posts, and each post has comments. Here are the basic requirements of the API:
* Create a user.
* Retrieve all comments associated with a user's post.
* Update a post.
* Delete a comment.
* Allow Cross-Origin Resource Sharing (CORS) from any domain.
* Provide simple validation and appropriate HTTP statuses in the response.
* When performing a mutation, ensure that all incoming requests for those routes contain an `authorization` header. The value of this header can be any non-empty string. If the request does not contain a header of `authorization`, respond with the appropriate HTTP status code.

## Project Dependencies and Structure
The HTTP server is created from [Express](https://expressjs.com/).

The database is handled via [LokiJS](http://lokijs.org), which is, to quote their website, "A fast, in-memory document-oriented datastore for node.js, browser and cordova". In `config/loki.js`, the database is initialized in memory and a method is provided for retrieving the database connection. You may implement the data access layer using any frameworks and architecture you would like.

This project was generated via the [Express Generator NPM dependency](https://expressjs.com/en/starter/generator.html). You can reorganize routes, controllers, etc. as you see fit.

## Developing
Ensure you have the latest LTS NodeJS and NPM versions installed. Preferred version is NodeJS v10.x and NPM v6.x.
```bash
# Install dependencies
npm install

# Run in development mode with `nodemon`
npm run dev

# Optionally, run directly with `node`
npm run start
```
Navigate to `localhost:3001` on your machine and the index page should be accessible. All API endpoints should also be accessible from this URL and port.

## Data Schema Reference
Here are some simple examples of the three data types used in this project. You can see the full data in the `data` folder.  
**User**
```json5
{
  "id": 1,
  "name": "Leanne Graham",
  "username": "Bret",
  "email": "Sincere@april.biz",
  "address": {
    "street": "Kulas Light",
    "city": "Gwenborough",
    "zipcode": "92998-3874",
    "geo": {
      "lat": "-37.3159",
      "lng": "81.1496"
    }
  },
  "phoneNumbers": ["1-770-736-8031 x56442", "1-771-736-8032"],
  "website": "hildegard.org"
}
```
**Post**
```json5
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```
**Comment**
```json5
{
  "postId": 1,
  "id": 1,
  "name": "id labore ex et quam laborum",
  "email": "Eliseo@gardner.biz",
  "body": "laudantium enim quasi est quidem magnam voluptate ipsam \n skdfjb"
}
```

## Steps to Complete
* Create a Fork of the repository into your personal GitHub space.
* Implement the API requirements as described above.
* Create a Pull Request back to the original project.
