const express = require('express');

const router = express.Router();

router.route('/')
    .get((req, res, next) => {
        res.status(200).json({
            message: "Users listed",
            data: {}
        })
        }
    );

module.exports = router;
