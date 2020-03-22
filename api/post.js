const bodyParser = require('body-parser');
const auth = require('../lib/auth');
const db = require('../config/loki').getDatabase();

function postRoutes(api) {
    /**
     * Update Post Endpoint
     *
     * Requirement: "Update a post."
     */
    api.patch(
        '/post/:postId',
        auth,
        bodyParser.json(),
        (req, res) => {
        try {
            const posts = db.getCollection('posts');
            const postId = parseInt(req.params.postId);

            const post = posts.findOne({ id: postId });
            if (!post) {
                return res.status(404).send('post not found');
            }

            Object.keys(req.body).forEach(key => {
                post[key] = req.body[key];
            });

            posts.update(post);

            return res.status(200).send();
        } catch (err) {
            console.error(err);
            return res.status(400).send();
        }
    })
}

module.exports = postRoutes;
