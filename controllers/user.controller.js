const db = require('../config/loki').getDatabase();
const users = db.getCollection('users');

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.username) {
        return res.status(400).send({
            message: "Missing required data."
        });
    }
    const user = req.body;

    // Save user in the database
    const result = users.insert(user);
    if (result) {
        res.send({
            message: "User updated."
        });
    } else {
        res.status(500).send({
            message: "Some error occurred while saving user."
        });
    }

};
