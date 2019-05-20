const db = require('../config/loki').getDatabase();
const comments = db.getCollection('comments');

// Create and Save a new Comment
exports.create = (req, res) => {
    // Validate request
    if(!req.body.postId || !req.body.body) {
        return res.status(400).send({
            message: "Missing required data."
        });
    }
    const comment = {
        postId: req.body.postId,
        name: req.body.name || 'untitled',
        body: req.body.body
    }
    // Save comment in the database
    const result = comments.insert(comment);
    if (result) {
        res.send({
            message: "Comment created."
        });
    } else {
        res.status(500).send({
            message: "Some error occurred while creating comment."
        });
    }
};

// Retrieve and return all comments from the database.
exports.findAll = (req, res) => {
    const result = comments.find({ id: { $gt: 0 } });
    if (result) {
        res.send(result);
    } else {
        res.status(500).send({
            message: "Some error occurred while retrieving comments."
        });
    }
};

// Find a single comment with a commentId
exports.findOne = (req, res) => {
    // Validate request
    if(!req.params.commentId) {
        return res.status(400).send({
            message: "Missing required id"
        });
    }
    const result = comments.get(req.params.commentId);
    if (result) {
        res.send(result);
    } else {
        res.status(500).send({
            message: "Some error occurred while retrieving comment."
        });
    }
};

// Find a single comment with a commentId
exports.findByPost = (req, res) => {
    // Validate request
    if(!req.params.postId) {
        return res.status(400).send({
            message: "Missing required id"
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
