const db = require('../config/loki').getDatabase();
const posts = db.getCollection('posts');
const sanitizer = require('sanitize')();

// Update a post identified by the postId in the request
exports.update = (req, res) => {
    // Validate request
    if(!req.body.title || !req.body.body || !req.body.userId  ) {
        return res.status(400).send({
            message: "Missing required data."
        });
    }
    // Sanitize data
    const title = sanitizer.value(req.body.title, 'string');
    const body = sanitizer.value(req.body.body, 'string');
    const postId = sanitizer.value(req.body.postId, 'integer');
    const post = {
        postId,
        title,
        body,
    };
    const result = posts.update(post);
    if (result) {
        res.send({
            message: "Post updated."
        });
    } else {
        res.status(500).send({
            message: "Some error occurred while updating post."
        });
    }

};
