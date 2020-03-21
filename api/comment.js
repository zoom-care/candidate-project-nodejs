const db = require('../config/loki').getDatabase();

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
            const postComments = comments.data.filter(comment => comment.postId === postId);
            return res.status(200).send(postComments);
        } catch (err) {
            console.error(err);
            return res.status(400).send();
        }
    })
}

module.exports = commentRoutes;
