# Code Challenge Notes

# Approach
All of the new files are contained in src/api/routes nad src/api/services. I created
a [Swagger file](swagger.yaml) and used the express codegen as a reference for creating 
routes and services. The route code is pretty much unaltered other than adding a manual 
authRequest call. 

If you are interested in the codegen output you can use "npm run codegen" and the output
will be in the "generated" folder.

# Create a user
Files:
* [src/api/routes/user](src/api/routes/user.js)
* [src/api/services/user](src/api/services/user.js)

Testing Auth(should fail):

```bash
curl -d '{ "id": "not going to happen"}' -H "Content-Type: application/json" -X POST http://localhost:3001/user
```

Testing Add:

```bash
curl -d '{"id":1001,"name":"Leanne Graham Jr","username":"Bret","email":"Sincere@april.biz","address":{"street":"Kulas Light","city":"Gwenborough","zipcode":"92998-3874","geo":{"lat":"-37.3159","lng":"81.1496"}},"phoneNumbers":["1-770-736-8031 x56442","1-771-736-8032"],"website":"hildegard.org"}' -H "Content-Type: application/json" -H "Authorization: key" -X POST http://localhost:3001/user
```


# Retrieve all comments
Files:
* [src/api/routes/comment.js](src/api/routes/comment.js)
* [src/api/services/comment.js](src/api/services/comment.js)


Testing:

```bash
 curl -H "Content-Type: application/json" -X GET http://localhost:3001/comment/post/1
```

# Update a post
Files:
* [src/api/routes/post.js](src/api/routes/post.js)
* [src/api/services/post.js](src/api/services/post.js)


Testing:

```bash

curl -d '{ "userId": 1,"id": 1,"title": "Updated Title","body": "Updated post body"}' -H "Content-Type: application/json" -H "Authorization: key" -X POST http://localhost:3001/post

```

# Delete a comment
Files:
* [src/api/routes/comment.js](src/api/routes/comment.js)
* [src/api/services/comment.js](src/api/services/comment.js)


Testing:

```bash

curl -H "Content-Type: application/json" -H "Authorization: key" -X DELETE http://localhost:3001/comment/1

```
