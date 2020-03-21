const express = require('express');

const api = express();

/**
 * API Health Check Endpoint
 */
api.get('/health', (req,res) => {
    res.status(200).send('ok');
})

module.exports = api;
