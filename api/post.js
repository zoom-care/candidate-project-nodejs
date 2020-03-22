const bodyParser = require('body-parser');
const { body, validationResult, matchedData } = require('express-validator');
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
        [
            body('title').optional().isString(),
            body('body').optional().isString()
        ],
        (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ errors: errors.array() });
            }

            const updates = matchedData(req);

            const posts = db.getCollection('posts');
            const postId = parseInt(req.params.postId);

            const post = posts.findOne({ id: postId });
            if (!post) {
                return res.status(404).send('post not found');
            }

            Object.keys(updates).forEach(key => {
                post[key] = updates[key];
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
