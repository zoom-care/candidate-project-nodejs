module.exports = (app) => {
    const commentsCtrl = require('../controllers/comment.controller.js');

    app.get('/commentsByPost/:postId', commentsCtrl.findByPost);

    /**
     * Require authorization header for routes that perform mutations
     */
    app.use(function(req, res, next) {
      if (!req.headers.authorization) {
        return res.status(403).json({ error: 'No credentials sent!' });
      }
      next();
    });
    app.delete('/comments/:commentId', commentsCtrl.delete);
}
