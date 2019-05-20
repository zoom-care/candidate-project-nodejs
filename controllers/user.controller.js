const db = require('../config/loki').getDatabase();
const users = db.getCollection('users');
const sanitizer = require('sanitize')();

// Create and Save a new user
exports.create = (req, res) => {
    // Validate request
    if(!req.body.name || !req.body.username) {
        return res.status(400).send({
            message: "Missing required data."
        });
    }
    // Sanitize data
    const name = sanitizer.value(req.body.name, 'string');
    const username = sanitizer.value(req.body.username, 'string');
    const email = sanitizer.value(req.body.email, 'string');
    const street = sanitizer.value(req.body.address.street, 'string');
    const city = sanitizer.value(req.body.address.city, 'string');
    const zipcode = sanitizer.value(req.body.address.zipcode, 'string');
    const lat = sanitizer.value(req.body.address.geo.lat, 'string');
    const lng = sanitizer.value(req.body.address.geo.lng, 'string');
    const website = sanitizer.value(req.body.website, 'string');
    let phoneNumbers = [];
    if (req.body.phoneNumbers && req.body.phoneNumbers.length > 0) {
        phoneNumbers = array1.map(phoneNumber => sanitizer.value(phoneNumber, 'string'));
    }
    const user = {
        name,
        username,
        email,
        address: {
            street,
            city,
            zipcode,
            geo: {
                lat,
                lng,
            }
        },
        phoneNumbers,
        website,
    };

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
