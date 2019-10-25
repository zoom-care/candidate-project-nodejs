const connection = require('../../config/loki.js');

var db = connection.getDatabase();

// Find a single Comment with an id
exports.findOne = (req, res) => {
    var comment = db.getCollection('comments').findObject({'id': parseInt(req.params.id)});
    if(!comment) {
        return res.status(404).send({
            message: "Comment not found with id " + req.params.id
        });            
    }
    res.send(comment);
};

// Retrieve all comments from a Post id.
exports.findAllPerPost = (req, res) => {
    var comments = db.getCollection('comments').find({'postId': parseInt(req.params.id)});
    if(!comments) {
        return res.status(404).send({
            message: "Comments not found with Post id " + req.params.id
        });            
    }
    res.send(comments);
};

// Delete a Comment with the specified id
exports.delete = (req, res) => {
    var comment = db.getCollection('comments').findObject({'id': parseInt(req.params.id)});
    if(!comment) {
        return res.status(404).send({
            message: "Comment not found with id " + req.params.id
        });            
    }

    try{
        comment.delete;
        db.saveDatabase();
        res.send(comment);
    } catch (err) {
        res.status(500).send({
            message: "Could not delete Comment with id " + req.params.id + " : " + err.message
        });
    };
};