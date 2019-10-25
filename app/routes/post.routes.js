module.exports = (app) => {
    const posts = require('../controllers/post.controller.js');

    // Retrieve a single Post with id
    app.get('/posts/:id', posts.findOne);

    // Update a Post with id
    app.put('/posts/:id', posts.update);
}