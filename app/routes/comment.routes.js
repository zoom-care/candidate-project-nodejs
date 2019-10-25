module.exports = (app) => {
    const comments = require('../controllers/comment.controller.js');

    // Retrieve a single Comment with id
    app.get('/comments/:id', comments.findOne);

    // Retrieve all Comments for a User's Post
    app.get('/comments/post/:id', comments.findAllPerPost);

    // Delete a Comment with id
    app.delete('/comments/:id', comments.delete);
}