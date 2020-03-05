const express = require('express');
const config = require('../config/loki');
config.init();
console.log('init');
const db = config.getDatabase();

const router = express.Router();
const users = db.getCollection('users');

router.param('user_id', (req, res, next, id) => {
    req.user = users.get(id);
    next();
})

router.route('/')
    .get((req, res, next) => {
        res.status(200).json({
            message: "Users listed",
            length: users && users.data && users.data.length || "0",
            data: users && users.data || {}
        })
    });

router.route('/:user_id')
    .get((req, res, next) => {
        res.json(req.user)
    })
    .put((req, res, next) => {
        next(new Error('not implemented'))
    })
    .post((req, res, next) => {
        next(new Error('not implemented'))
    })
    .delete((req, res, next) => {
        next(new Error('not implemented'))
    });


module.exports = router;
