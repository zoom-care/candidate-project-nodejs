const db = require('../config/loki').getDatabase();
const comments = db.getCollection('comments');

// Find all comments for a post
exports.findByPost = (req, res) => {
    // Validate request
    if(!req.params.postId) {
        return res.status(400).send({
            message: "Missing required post id."
        });
    }
    const postId = parseInt(req.params.postId);
    const result = comments.find({ postId: { '$eq' : postId } });
    if (result) {
        res.send(result);
    } else {
        res.status(500).send({
            message: "Some error occurred while retrieving comment."
        });
    }
};

// Delete a comment with the specified commentId in the request
exports.delete = (req, res) => {
    // Validate request
    if(!req.params.commentId) {
        return res.status(400).send({
            message: "Missing required id."
        });
    }
    const result = comments.get(req.params.commentId);
    if (result) {
        comments.remove(result);
        res.send({
            message: "Comment removed."
        });
    } else {
        res.status(500).send({
            message: "Some error occurred while deleting comment."
        });
    }
};
