const connection = require('../../config/loki.js');

var db = connection.getDatabase();

// Create and Save a new User
exports.create = (req, res) => {
    // Validate request
    if(!req.body) {
        return res.status(400).send({
            message: "User content can not be empty"
        });
    }

    var users = db.getCollection('users');

    // Save User in the database
    try{
        var insertedUser = users.insert(req.body);
        res.send(insertedUser);
    } catch (err) {
        res.status(500).send({
            message: "Error occurred while creating the User : " + err.message
        });
    };
};

// Find a single User with an id
exports.findOne = (req, res) => {
    var user = db.getCollection('users').findObject({'id': parseInt(req.params.id)});
    if(!user) {
        return res.status(404).send({
            message: "User not found with id " + req.params.id
        });            
    }
    res.send(user);
};