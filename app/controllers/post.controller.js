const connection = require('../../config/loki.js');

var db = connection.getDatabase();

// Find a single Post with an id
exports.findOne = (req, res) => {
    var post = db.getCollection('posts').findObject({'id': parseInt(req.params.id)});
    if(!post) {
        return res.status(404).send({
            message: "Post not found with id " + req.params.id
        });            
    }
    res.send(post);
};

// Update a Post with an id
exports.update = (req, res) => {
    // Validate Request
    if(!req.body) {
        return res.status(400).send({
            message: "Post content can not be empty"
        });
    }

    // Find Post and update it with the request body
    var post = db.getCollection('posts').findObject({'id': parseInt(req.params.id)});
    if(!post) {
        return res.status(404).send({
            message: "Post not found with id " + req.params.id
        });
    }

    try{
        post.update(req.body);
        res.send(post);
    } catch (err) {
        res.status(500).send({
            message: "Error updating Post with id " + req.params.id + " : " + err.message
        });
    };
};