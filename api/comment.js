const db = require('../config/loki').getDatabase();
const auth = require('../lib/auth');

function commentRoutes(api) {
    /**
     * GET Comments For Post Endpoint
     *
     * Requirement: "Retrieve all comments associated with a user's post."
     */
    api.get('/comments/:postId', (req, res) => {
        try {
            const comments = db.getCollection('comments');
            const postId = parseInt(req.params.postId);
            const postComments = comments.find({ postId });
            return res.status(200).send(postComments);
        } catch (err) {
            console.error(err);
            return res.status(400).send();
        }
    })

    /**
     * DELETE Comment Endpoint
     *
     * Requirement: "Delete a comment."
     */
    api.delete(
        '/comment/:commentId',
        auth,
        (req, res) => {
        try {
            const comments = db.getCollection('comments');
            const commentId = parseInt(req.params.commentId);
            const postComments = comments.findAndRemove({ id: commentId });
            return res.status(200).send(postComments);
        } catch (err) {
            console.error(err);
            return res.status(400).send();
        }
    })
}

module.exports = commentRoutes;
