const db = require('../config/loki').getDatabase();
const posts = db.getCollection('posts');

// Update a post identified by the postId in the request
exports.update = (req, res) => {
    // Validate request
    if(!req.body.title || !req.body.body || !req.body.userId  ) {
        return res.status(400).send({
            message: "Missing required data."
        });
    }
    const post = req.body;

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
