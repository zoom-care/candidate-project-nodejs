module.exports = (app) => {
    const comments = require('../controllers/comment.controller.js');

    app.post('/comments', comments.create);
    app.get('/comments', comments.findAll);
    app.get('/comments/:commentId', comments.findOne);
    app.put('/comments/:commentId', comments.update);
    app.delete('/comments/:commentId', comments.delete);
}
