const bodyParser = require('body-parser');
const auth = require('../lib/auth');
const db = require('../config/loki').getDatabase();

function userRoutes(api) {
    /**
     * POST User Endpoint
     *
     * Requirement: "Create a user"
     */
    api.post(
        '/user',
        auth,
        bodyParser.json(),
        (req, res) => {
        try {
            const users = db.getCollection('users');
            users.insert(req.body);
            return res.status(201).send();
        } catch (err) {
            console.error(err);
            return res.status(400).send();
        }
    })
}

module.exports = userRoutes;
