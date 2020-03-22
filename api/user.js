const bodyParser = require('body-parser');
const { body, validationResult, matchedData } = require('express-validator');
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
        [
            body('name').isString().not().isEmpty(),
            body('username').isString().not().isEmpty(),
            body('email').isEmail(),
            body('address').optional(),
            body('phoneNumbers').optional().isArray(),
            body('website').optional()
        ],
        (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(422).send({ errors: errors.array() });
            }

            const data = matchedData(req);

            const users = db.getCollection('users');

            users.insert(data);

            return res.status(201).send();
        } catch (err) {
            console.error(err);
            return res.status(400).send();
        }
    })
}

module.exports = userRoutes;
