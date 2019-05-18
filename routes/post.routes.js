module.exports = (app) => {
    const posts = require('../controllers/post.controller.js');

    app.post('/posts', posts.create);
    app.get('/posts', posts.findAll);
    app.get('/posts/:postId', posts.findOne);
    app.put('/posts/:postId', posts.update);
    app.delete('/posts/:postId', posts.delete);
}
